import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { Toolbar, ToolbarGroup, ToolbarItem } from '@patternfly/react-core';
import { Dashboard, DashboardModel, DashboardQuery, Aggregator } from '@kiali/k-charted-pf4';

import { serverConfig } from '../../config/ServerConfig';
import history from '../../app/History';
import RefreshContainer from '../../components/Refresh/Refresh';
import * as API from '../../services/Api';
import { KialiAppState } from '../../store/Store';
import { DurationInSeconds } from '../../types/Common';
import * as MessageCenter from '../../utils/MessageCenter';

import * as MetricsHelper from './Helper';
import { MetricsSettings, LabelsSettings } from '../MetricsOptions/MetricsSettings';
import { MetricsSettingsDropdown } from '../MetricsOptions/MetricsSettingsDropdown';
import MetricsRawAggregation from '../MetricsOptions/MetricsRawAggregation';
import MetricsDuration from '../MetricsOptions/MetricsDuration';

type MetricsState = {
  dashboard?: DashboardModel;
  labelsSettings: LabelsSettings;
};

type CustomMetricsProps = RouteComponentProps<{}> & {
  namespace: string;
  app: string;
  version?: string;
  template: string;
};

export class CustomMetrics extends React.Component<CustomMetricsProps, MetricsState> {
  options: DashboardQuery;

  constructor(props: CustomMetricsProps) {
    super(props);

    const settings = MetricsHelper.readMetricsSettingsFromURL();
    this.options = this.initOptions(settings);
    // Initialize active filters from URL
    this.state = { labelsSettings: settings.labelsSettings };
  }

  initOptions(settings: MetricsSettings): DashboardQuery {
    const filters = `${serverConfig.istioLabels.appLabelName}:${this.props.app}`;
    const options: DashboardQuery = this.props.version
      ? {
          labelsFilters: `${filters},${serverConfig.istioLabels.versionLabelName}:${this.props.version}`
        }
      : {
          labelsFilters: filters,
          additionalLabels: 'version:Version'
        };
    MetricsHelper.settingsToOptions(settings, options);
    MetricsHelper.initDuration(options);
    return options;
  }

  componentDidMount() {
    this.fetchMetrics();
  }

  fetchMetrics = () => {
    API.getCustomDashboard(this.props.namespace, this.props.template, this.options)
      .then(response => {
        const labelsSettings = MetricsHelper.extractLabelsSettings(response.data);
        this.setState({
          dashboard: response.data,
          labelsSettings: labelsSettings
        });
      })
      .catch(error => {
        MessageCenter.addError('Could not fetch custom dashboard.', error);
        // TODO: is this console logging necessary?
        console.error(error);
      });
  };

  onMetricsSettingsChanged = (settings: MetricsSettings) => {
    MetricsHelper.settingsToOptions(settings, this.options);
    this.fetchMetrics();
  };

  onLabelsFiltersChanged = (labelsFilters: LabelsSettings) => {
    this.setState({ labelsSettings: labelsFilters });
  };

  onDurationChanged = (duration: DurationInSeconds) => {
    MetricsHelper.durationToOptions(duration, this.options);
    this.fetchMetrics();
  };

  onRawAggregationChanged = (aggregator: Aggregator) => {
    this.options.rawDataAggregator = aggregator;
    this.fetchMetrics();
  };

  render() {
    if (!this.state.dashboard) {
      return this.renderOptionsBar();
    }

    const urlParams = new URLSearchParams(history.location.search);
    const expandedChart = urlParams.get('expand') || undefined;

    return (
      <>
        {this.renderOptionsBar()}
        <Dashboard
          dashboard={this.state.dashboard}
          labelValues={MetricsHelper.convertAsPromLabels(this.state.labelsSettings)}
          expandedChart={expandedChart}
          expandHandler={this.expandHandler}
        />
      </>
    );
  }

  renderOptionsBar() {
    const hasHistograms =
      this.state.dashboard !== undefined &&
      this.state.dashboard.charts.some(chart => {
        if (chart.histogram) {
          return Object.keys(chart.histogram).length > 0;
        }
        return false;
      });
    return (
      <Toolbar style={{ padding: 10 }}>
        <ToolbarGroup>
          <ToolbarItem>
            <MetricsSettingsDropdown
              onChanged={this.onMetricsSettingsChanged}
              onLabelsFiltersChanged={this.onLabelsFiltersChanged}
              labelsSettings={this.state.labelsSettings}
              hasHistograms={hasHistograms}
            />
          </ToolbarItem>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarItem>
            <MetricsRawAggregation onChanged={this.onRawAggregationChanged} />
          </ToolbarItem>
        </ToolbarGroup>
        <ToolbarGroup style={{ marginLeft: 'auto', marginRight: 0 }}>
          <ToolbarItem>
            <MetricsDuration onChanged={this.onDurationChanged} />
          </ToolbarItem>
          <ToolbarItem>
            <RefreshContainer id="metrics-refresh" handleRefresh={this.fetchMetrics} hideLabel={true} />
          </ToolbarItem>
        </ToolbarGroup>
      </Toolbar>
    );
  }

  private expandHandler = (expandedChart?: string) => {
    const urlParams = new URLSearchParams(history.location.search);
    urlParams.delete('expand');
    if (expandedChart) {
      urlParams.set('expand', expandedChart);
    }
    history.push(history.location.pathname + '?' + urlParams.toString());
  };
}

const mapStateToProps = (_: KialiAppState) => ({});

const CustomMetricsContainer = withRouter<RouteComponentProps<{}> & CustomMetricsProps>(
  connect(mapStateToProps)(CustomMetrics)
);

export default CustomMetricsContainer;
