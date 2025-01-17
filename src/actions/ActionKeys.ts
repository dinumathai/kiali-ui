export enum ActionKeys {
  INCREMENT_LOADING_COUNTER = 'INCREMENT_LOADING_COUNTER',
  DECREMENT_LOADING_COUNTER = 'DECREMENT_LOADING_COUNTER',
  SET_PAGE_VISIBILITY_HIDDEN = 'SET_PAGE_VISIBILITY_HIDDEN',
  SET_PAGE_VISIBILITY_VISIBLE = 'SET_PAGE_VISIBILITY_VISIBLE',

  GRAFANA_SET_INFO = 'GRAFANA_SET_INFO',

  GRAPH_CHANGED = 'GRAPH_CHANGED',
  GRAPH_SET_LAYOUT = 'GRAPH_SET_LAYOUT',
  GRAPH_SET_NODE = 'GRAPH_SET_NODE',
  UPDATE_GRAPH = 'UPDATE_GRAPH',
  UPDATE_SUMMARY = 'UPDATE_SUMMARY',
  GET_GRAPH_DATA_START = 'GET_GRAPH_DATA_START',
  GET_GRAPH_DATA_SUCCESS = 'GET_GRAPH_DATA_SUCCESS',
  GET_GRAPH_DATA_FAILURE = 'GET_GRAPH_DATA_FAILURE',
  HANDLE_LEGEND = 'HANDLE_LEGEND',
  GET_GRAPH_DATA_WITHOUT_NAMESPACES = 'GET_GRAPH_DATA_WITHOUT_NAMESPACES',

  GRAPH_FILTER_SET_EDGE_LABEL_MODE = 'GRAPH_FILTER_SET_EDGE_LABEL_MODE',
  GRAPH_FILTER_SET_FIND_VALUE = 'GRAPH_FILTER_SET_FIND_VALUE',
  GRAPH_FILTER_SET_GRAPH_TYPE = 'GRAPH_FILTER_SET_GRAPH_TYPE',
  GRAPH_FILTER_SET_HIDE_VALUE = 'GRAPH_FILTER_SET_HIDE_VALUE',
  GRAPH_FILTER_SET_SHOW_UNUSED_NODES = 'GRAPH_FILTER_SET_SHOW_UNUSED_NODES',
  // Toggle Actions
  GRAPH_FILTER_TOGGLE_COMPRESS_ON_HIDE = 'GRAPH_FILTER_TOGGLE_COMPRESS_ON_HIDE',
  GRAPH_FILTER_TOGGLE_GRAPH_NODE_LABEL = 'GRAPH_FILTER_TOGGLE_GRAPH_NODE_LABEL',
  GRAPH_FILTER_TOGGLE_GRAPH_CIRCUIT_BREAKERS = 'GRAPH_FILTER_TOGGLE_GRAPH_CIRCUIT_BREAKERS',
  GRAPH_FILTER_TOGGLE_GRAPH_VIRTUAL_SERVICES = 'GRAPH_FILTER_TOGGLE_GRAPH_VIRTUAL_SERVICES',
  GRAPH_FILTER_TOGGLE_GRAPH_MISSING_SIDECARS = 'GRAPH_FILTER_TOGGLE_GRAPH_MISSING_SIDECARS',
  GRAPH_FILTER_TOGGLE_GRAPH_SECURITY = 'GRAPH_FILTER_TOGGLE_GRAPH_SECURITY',
  GRAPH_FILTER_TOGGLE_LEGEND = 'GRAPH_FILTER_TOGGLE_LEGEND',
  GRAPH_FILTER_TOGGLE_FIND_HELP = 'GRAPH_FILTER_TOGGLE_FIND_HELP',
  GRAPH_FILTER_TOGGLE_SERVICE_NODES = 'GRAPH_FILTER_TOGGLE_SERVICE_NODES',
  GRAPH_FILTER_TOGGLE_TRAFFIC_ANIMATION = 'GRAPH_FILTER_TOGGLE_TRAFFIC_ANIMATION',
  GRAPH_FILTER_TOGGLE_UNUSED_NODES = 'GRAPH_FILTER_TOGGLE_UNUSED_NODES',
  // Disable Actions
  ENABLE_GRAPH_FILTERS = 'ENABLE_GRAPH_FILTERS',

  HELP_STATUS_REFRESH = 'HELP_STATUS_REFRESH',

  JAEGER_SET_URL = 'JAEGER_SET_URL',
  JAEGER_SET_ENABLE_INTEGRATION = 'JAEGER_SET_ENABLE_INTEGRATION',
  JAEGER_SET_INFO = 'JAEGER_SET_INFO',

  LOGIN_REQUEST = 'LOGIN_REQUEST',
  LOGIN_EXTEND = 'LOGIN_EXTEND',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
  LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
  SESSION_EXPIRED = 'SESSION_EXPIRED',

  MTLS_SET_INFO = 'MTLS_SET_INFO',

  MC_ADD_MESSAGE = 'MC_ADD_MESSAGE',
  MC_REMOVE_MESSAGE = 'MC_REMOVE_MESSAGE',
  MC_MARK_MESSAGE_AS_READ = 'MC_MARK_MESSAGE_AS_READ',
  MC_TOGGLE_MESSAGE_DETAIL = 'MC_TOGGLE_MESSAGE_DETAIL',
  MC_SHOW = 'MC_SHOW',
  MC_HIDE = 'MC_HIDE',
  MC_TOGGLE_EXPAND = 'MC_TOGGLE_EXPAND',
  MC_TOGGLE_GROUP = 'MC_TOGGLE_GROUP',
  MC_HIDE_NOTIFICATION = 'MC_HIDE_NOTIFICATION',
  MC_EXPAND_GROUP = 'MC_EXPAND_GROUP',

  NAMESPACE_REQUEST_STARTED = 'NAMESPACE_REQUEST_STARTED',
  NAMESPACE_SUCCESS = 'NAMESPACE_SUCCESS',
  NAMESPACE_FAILED = 'NAMESPACE_FAILED',
  TOGGLE_ACTIVE_NAMESPACE = 'TOGGLE_ACTIVE_NAMESPACE',
  SET_ACTIVE_NAMESPACES = 'SET_ACTIVE_NAMESPACES',
  NAMESPACE_SET_FILTER = 'NAMESPACE_SET_FILTER',

  NAV_COLLAPSE = 'NAV_COLLAPSE',
  SET_DURATION = 'SET_DURATION',
  SET_REFRESH_INTERVAL = 'SET_REFRESH_INTERVAL',
  SET_LAST_REFRESH = 'SET_LAST_REFRESH'
}
