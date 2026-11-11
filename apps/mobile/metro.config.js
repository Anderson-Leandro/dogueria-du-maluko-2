// Metro configurado para usar o código compartilhado em packages/core.
// O repositório não usa npm workspaces (web usa React 18, mobile React 19),
// então o core não tem node_modules: tudo que ele importa (ex.: react) deve
// vir das dependências DESTE app, para nunca existirem dois Reacts.
const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const projectRoot = __dirname;
const coreRoot = path.resolve(projectRoot, '../../packages/core');

const config = getDefaultConfig(projectRoot);

// Observa o core para recarregar ao editar os arquivos compartilhados
config.watchFolders = [...(config.watchFolders ?? []), coreRoot];

// Arquivos do core (fora deste app) não encontram node_modules subindo pastas
// (a raiz do repositório não tem dependências): caem aqui, nas dependências do mobile
config.resolver.nodeModulesPaths = [path.resolve(projectRoot, 'node_modules')];

// Import "@dogueria/core" (e subcaminhos) aponta para o código-fonte do core
config.resolver.extraNodeModules = {
  ...(config.resolver.extraNodeModules ?? {}),
  '@dogueria/core': path.resolve(coreRoot, 'src'),
};

module.exports = config;
