
export default {
  setWizard(state, value) {
    state.wizard = value;
  },
  updateWizard(state, value) {
    state.wizard = { ...state.wizard, ...value };
  },
  deleteSnippet(state, value) {
    state.snippets = state.snippets.filter(e => e.id != value.id);
  },
  updateFontSize(state, value) {
    state.fontSize = value;
    window.localStorage.setItem('fontSize', value);
  },
  updateEnableAudio(state, value) {
    state.enableAudio = value;
    window.localStorage.setItem('enableAudio', value);
  },
  updateSendOnEnter(state, value) {
    state.sendOnEnter = value;
    window.localStorage.setItem('sendOnEnter', value);
  },
  updateEngine(state, value) {
    state.selectedEngine = value;
    window.localStorage.setItem('selectedEngine', value);
  },
  updateWhiteLabel(state, value) {
    state.showWhiteLabel = value;
  },
  setRooms(state, value) {
    state.rooms = value;
  },
  setAssistants(state, value) {
    // somehow this is getting an undefined element passed into it and crashing things (before merge, idk now)
    state.assistants = value ? value.filter(v => typeof v != 'undefined') : value;
    state.assistantsMapped = Object.fromEntries(state.assistants.map(e => [e.id, e]));
  },
  setArchivedAssistants(state, value) {
    // somehow this is getting an undefined element passed into it and crashing things (before merge, idk now)
    state.archivedAssistants = value ? value.filter(v => typeof v != 'undefined') : value;
    state.archivedAssistantsMapped = state.archivedAssistants.reduce((acc, e) => {
      acc[e.id] = e;
      return acc;
    }, {});
  },
  setSelectedModel(state, value) {
    state.selectedModel = value;
    //state.selectedAssistant = value;
  },
  setEngines(state, value) {
    state.engines = value;
  },
  addModel(state, value) {
    let sort = JSON.parse(window.localStorage.getItem('modelSort'));
    state.assistants = [...state.assistants, value].sort((a,b) => sort && sort.value == 'title' ? a.name.localeCompare(b.name) : a.date_added.localeCompare(b.date_added));
    state.assistants = sort && sort.order == 'ASC' ? state.assistants : state.assistants.reverse();
  },
  deleteModel(state, assistant) {
    state.archivedAssistants.unshift(assistant);
    state.assistants = state.assistants.filter(e => e.id != assistant.id);
  },
  selectAssistant(state, assistant) {
    state.selectedAssistant = assistant;
    window.localStorage.setItem('selectedModel', assistant.id);
  },
  setFiles(state, value) {
    state.files = value;
  },
  setCurrentPlan(state, value){
    state.currentPlan = value;
  },
  setIPAddress(state, value){
    state.ip_address = value;
  },
  setDeployments(state, value) {
    state.deployments = value;
  },
  addDeployment(state, value) {
    if(!state.deployments){
      state.deployments = [value];
    }else{
      state.deployments.unshift(value);
    }
  },
  updateDeploy(state, value) {
    state.deployments = state.deployments ? state.deployments.map(e => e.id == value.id ? value : e) : null;
  },
  addAssistant(state, value) {
    window.localStorage.setItem('selectedModel', value.id);
    state.selectedModel = value;
    state.selectedAssistant = value;
    state.assistants.unshift(value);
  },
  updateAssistant(state, value) {
    state.assistants = state.assistants ? state.assistants.map(e => e.id == value.id ? { ...e, ...value } : e) : null;
  },
  setTokens(state, value){
    state.tokensUsed = value;
  },
  refreshPins(state, value) {
    state.pins = value;
  },
  addPin(state, value) {
    state.pins.unshift(value);
  },
  deletePin(state, value) {
    state.pins = state.pins.filter(e => e.id != value);
  },
  updatePin(state, value) {
    state.pins = state.pins.map(e => e.event_id == value.event_id ? value : e);
  }
}
