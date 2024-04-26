import Vue from 'vue';
import Router from 'vue-router';

function loadPage(page) {
  return () => import(/* webpackChunkName: "page-[request]" */ `@/pages/${page}.vue`);
}

const routes = [
  {
    path: '/',
    name: 'MessengerPage',
    component: loadPage('messenger/messenger')
  },
  {
    path: '/models',
    name: 'ModelsPage',
    component: loadPage('models')
  },
  {
    path: '/files',
    name: 'FilesPage',
    component: loadPage('files'),
    meta: { layout: 'no-sidebars' },
  },
  {
    path: '/deploy',
    name: 'DeployPage',
    redirect: '/deploy/list',
    component: loadPage('deploy/index'),
    meta: { layout: 'no-sidebar' },
    children: [
      {
        path: '/deploy/list',
        name: 'DeployListPage',
        component: loadPage('deploy/list'),
        meta: { layout: 'no-sidebar' }
      },
      {
        path: '/deploy/ai_chatbot/:id',
        name: 'DeployNewChatbot',
        props: true,
        component: loadPage('deploy/new-chatbot'),
        meta: { layout: 'no-sidebar' }
      },
      {
        path: '/deploy/api_endpoint/:id',
        name: 'DeployNewEndpoint',
        props: true,
        component: loadPage('deploy/new-endpoint'),
        meta: { layout: 'no-sidebar' }
      }
    ]
  },
  {
    path: '/embeddings/:id',
    name: 'EmbeddingsPage',
    component: loadPage('embeddings')
  },
  {
    path: '/posts/:accId/:modelId',
    name: 'PostsPage',
    component: loadPage('posts'),
    meta: { layout: 'no-sidebar' }
  },
  {
    path: '/pricing',
    name: 'PricingPage',
    component: loadPage('pricing'),
    meta: {
      layout: 'no-sidebars'
    }
  },
  {
    path: '/invoice/:id',
    name: 'InvoicePage',
    component: loadPage('invoice')
  },
  {
    path: '/wizard',
    name: 'wizard',
    component: loadPage('wizard/index'),
    meta: { layout: 'empty' },
    redirect: '/wizard/welcome',
    children: [
      {
        name: 'wizard-welcome',
        path: '/wizard/welcome',
        component: loadPage('wizard/welcome'),
        meta: {
          layout: 'empty'
        }
      },
      {
        name: 'wizard-user-type',
        path: '/wizard/user-type',
        component: loadPage('wizard/user-type'),
        meta: {
          title: 'What type of user are you?',
          description: 'This will determine what type of models you can create.',
          layout: 'empty'
        }
      },
      {
        name: 'wizard-model-name',
        path: '/wizard/model-name',
        component: loadPage('wizard/model-name'),
        meta: {
          title: 'Create your first A.I model!',
          layout: 'empty'
        }
      },
      {
        name: 'wizard-website-url',
        path: '/wizard/website-url',
        component: loadPage('wizard/website-url'),
        meta: {
          title: 'Do you have a website?',
          layout: 'empty',
          skippable: true
        }
      },
      {
        name: 'wizard-model-type',
        path: '/wizard/model-type',
        component: loadPage('wizard/model-type'),
        meta: {
          title: 'What type of model are you trying to create?',
          layout: 'empty'
        }
      },
      {
        name: 'wizard-documents-type',
        path: '/wizard/documents-type',
        component: loadPage('wizard/documents-type'),
        meta: {
          title: 'What type of documents you want to upload?',
          description: 'You can train the A.I model on specific files, such as website copy, video, audio csv file, document. etc.',
          layout: 'empty',
          skippable: true
        }
      },
      {
        name: 'wizard-congrats',
        path: '/wizard/congrats',
        component: loadPage('wizard/congrats'),
        meta: {
          title: 'What type of user are you?',
          description: 'This will determine what type of models you can create.',
          layout: 'empty'
        }
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    redirect: '/user/settings',
    component: loadPage('user/index'),
    meta: { layout: 'settings' },
    children: [
      {
        name: 'user-settings',
        path: '/user/settings',
        component: loadPage('user/settings'),
        meta: { layout: 'settings' },
        children: [
          {
            name: 'user-setting-cards',
            path: '/user/settings/cards',
            component: loadPage('user/settings/cards'),
            meta: { layout: 'settings' }
          },
          {
            name: 'user-setting-account',
            path: '/user/settings/account',
            component: loadPage('user/settings/account'),
            meta: { layout: 'settings' }
          },
          {
            name: 'user-setting-security',
            path: '/user/settings/security',
            component: loadPage('user/settings/security'),
            meta: { layout: 'settings' }
          }
        ]
      }
    ]
  },
  {
    path: '/whitelabel',
    name: 'WhiteLabel',
    component: loadPage('white-label'),
    meta: { layout: 'no-sidebars' },
  },
];

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: routes
});


router.onError(error => {
  console.error(error);
  if (/ChunkLoadError:.*failed./i.test(error.message)) {
    console.log('Reloading Window 1');
    window.location.reload();
  }
  else if (/Loading.*chunk.*failed./i.test(error.message)) {
    console.log('Reloading Window 2');
    window.location.reload();
  }
});

export default router;
