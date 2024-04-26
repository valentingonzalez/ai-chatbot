import ChatService from '@/api-services/chat.service';
import ModelsService from '@/api-services/models.service';
import PricingService from '@/api-services/pricing.service';
import FilesService from '@/api-services/files.service';
import UserService from '@/api-services/user.service';
import DeployService from '@/api-services/deploy.service';
import SnippetsService from '@/api-services/snippets.service';
import config from '@/api-services/_config';
import moment from 'moment';
import router from '@/router/index';

export default {
  selectedModel(context, model){
    context.commit('setSelectedModel', model)
  },
  async getAllRooms(context, search) {
    let res = !search ? await ChatService.getAllRooms() : await ChatService.searchRooms({ search });
    context.commit('setRooms', res.rooms);
  },
  async getAssistants(context) {
    let memberId = await config.checkSession();
    let res = await ModelsService.getAssistants({ id: memberId, sort_by: router.currentRoute.query.sort_by || '' });
    context.commit('setAssistants', res.models);
  },
  async getArchivedAssistants(context) {
    let memberId = await config.checkSession();
    let res = await ModelsService.getAssistants({ id: memberId, is_archived: 1 });
    context.commit('setArchivedAssistants', res.models);
  },
  async getEngines(context) {
    let res = await ModelsService.getEngines()
    context.commit('setEngines', res.engines)
  },
  async newModel(context, model) {
    let memberId = await config.checkSession();

    let params = { id: memberId, ...model };
    let res = await ModelsService.add(params);
    context.commit('addModel', { name: model.title, description: model.objective,tones: model.tone, id: res.insert_id, date_added: moment().format('YYYY-MM-DD hh:mm:ss'), instruction_count: model.instructions ? model.instructions.length : 0 });
    return res.insert_id;
  },
  async addAssistant(context, data = {}) {
    let res = await ModelsService.addAssistant(data);
    context.commit('addAssistant', res);
    return res;
  },
  async getAllFiles(context) {
    let res = await FilesService.getFiles({ id: config.memberId })
    context.commit('setFiles', res.files.map(e => (
      { ...e, title: e.title || `${e.id}_${e.date_added}.${/(?:\.([^.]+))?$/.exec(e.file_url)[1]}` }
    )));
  },
  async deleteFile(context, value) {
    FilesService.completeFileDelete({ file_id: value });
    context.commit('setFiles', context.state.files.filter(e => e.id != value));
  },
  async getCurrentPlan(context) {
    let res = await PricingService.getCurrentPlan();
    context.commit('setCurrentPlan', res.plan);
  },
  async getMonthlyTokens(context) {
    let res = await ChatService.getMonthlyTokens();
    context.commit('setTokens', res.tokens);
  },
  async getIpAddress(context) {
    try {
      let res = await UserService.getIp({ id: config.memberId })
      const ipAddress = res.ip;
      context.commit('setIPAddress', ipAddress);

    } catch (error) {
      console.error('Error fetching IP address:', error);
    }
  },
  async getAllDeployments(context) {
    let res = await DeployService.getAllDeployments();
    context.commit('setDeployments', res.deployments);
  },
  updateAssistant(context, value) {
    ModelsService.updateModel({ ...value, model_id: value.id });
    context.commit('updateAssistant', value);
  },
  async pinMessage(context, value) {
    context.commit('addPin', value);
    let res = await SnippetsService.addSnippet(value);
    context.commit('updatePin', res.snippets.find(e => e.event_id == value.event_id));
  },
  async unpinMessage(context, value) {
    let id = value.snippet_id || context.state.pins.find(e => e.event_id == value.event_id).id;
    SnippetsService.delete({ snippet_id: id });
    context.commit('deletePin', id);
  },
  async getPins(context, value) {
    let snippets = await SnippetsService.getSnippets(value);
    return context.commit('refreshPins', snippets.snippets.map(e => ({...e, date: moment(e.date_added).format('MM/DD/YYYY')})));
  }
}
