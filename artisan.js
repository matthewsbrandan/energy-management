const fs = require('fs');
const path = require('path');

const sufix = {
  useCase: 'UseCase'
}
const dependency = {
  db: 'in-prisma'
};
const paths = {
  useCase: './src/domain/useCases',
  controller: './src/application/controllers',
  factory: './src/infra/factories',
  useCaseTo: {
    iRepository: '../../../repositories'
  },
  factoryTo: {
    repository: '../../repositories',
    controller: '../../../application/controllers',
    useCase: '../../../domain/useCases'
  },
  controllerTo: {
    useCase: '../../../domain/useCases'
  }
}

class Automator{
  __checkAndCreateFolder(folderPath){
    if(!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true })
  }
  makeUseCase(dir, name, repositories){
    const createUseCaseFile = (dir, name, repositories) => {
      const useCaseCode = [];
      if(repositories){
        repositories.forEach(repo => {
          useCaseCode.push(`import { I${repo} } from "${paths.useCaseTo.iRepository}/I${repo}";`);
        })
        useCaseCode.push(``);
      }
      useCaseCode.push(`export class ${name}${sufix.useCase}{`);
      if(repositories){
        useCaseCode.push(`  constructor(`);
        
        const repos = [];
        repositories.forEach(repo => {
          repos.push(`    private ${
            repo.replace('Repository','').split('').map(
              (char, i) => i === 0 ? char.toLowerCase() : char
            ).join('')
          }Repo: I${repo}`)
        })
        
        useCaseCode.push(repos.join(',\n'))
        useCaseCode.push(`  ){}`);
      }
      else useCaseCode.push(`  constructor(){}`);
      useCaseCode.push(``);
      useCaseCode.push(`  async execute(){`);
      useCaseCode.push(`  `);
      useCaseCode.push(`  }`);
      useCaseCode.push(`}`);
      
      const folderPath = path.join(__dirname, `${paths.useCase}/${dir}/${name}`);
      this.__checkAndCreateFolder(folderPath);
      const filePath = path.join(folderPath, `${name}${sufix.useCase}.ts`);
      fs.writeFileSync(filePath, useCaseCode.join('\n'));

      console.log(`(useCase)    ${paths.useCase}/${dir}/${name}/${name}${sufix.useCase}.ts`);
    }
    const createControllerFile = (dir, name) => {
      const controllerCode = []
      controllerCode.push(`import { Request, Response } from "express";`);
      controllerCode.push(`import { Controller } from "../Controller";`);
      controllerCode.push(`import { ${name}${sufix.useCase} } from "${paths.controllerTo.useCase}/${dir}/${name}/${name}${sufix.useCase}";`);
      controllerCode.push(``);
      controllerCode.push(`export class ${name}Controller extends Controller{`);
      controllerCode.push(`  constructor(`);
      controllerCode.push(`    private useCase: ${name}${sufix.useCase}`);
      controllerCode.push(`  ){ super() }`);
      controllerCode.push(``);
      controllerCode.push(`  async handle(request: Request, response: Response){`);
      controllerCode.push(`    try {`);
      controllerCode.push(`      const data = await this.useCase.execute();`);
      controllerCode.push(``);
      controllerCode.push(`      return response.status(200).json({`);
      controllerCode.push(`        result: true,`);
      controllerCode.push(`        response: "Mensagem de sucesso",`);
      controllerCode.push(`        data`);
      controllerCode.push(`      })`);
      controllerCode.push(`    } catch (error) {`);
      controllerCode.push(`      return response.status(500).json({`);
      controllerCode.push(`        result: false,`);
      controllerCode.push(`        response: error.message`);
      controllerCode.push(`      })`);
      controllerCode.push(`    }`);
      controllerCode.push(`  }`);
      controllerCode.push(`}`);
      
      const folderPath = path.join(__dirname, `${paths.controller}/${dir}`);
      this.__checkAndCreateFolder(folderPath);
      const filePath = path.join(folderPath, `${name}Controller.ts`);
      fs.writeFileSync(filePath, controllerCode.join('\n'));

      console.log(`(controller) ${paths.controller}/${dir}/${name}Controller.ts`);
    }
    const createFactoryFile = (dir, name, repositories) => {
      const factoryCode = [];
      factoryCode.push(`import { ${name}Controller } from "${paths.factoryTo.controller}/${dir}/${name}Controller";`)
      factoryCode.push(`import { ${name}${sufix.useCase} } from "${paths.factoryTo.useCase}/${dir}/${name}/${name}${sufix.useCase}";`)
      if(repositories){
        repositories.forEach(repo => {
          factoryCode.push(`import { ${repo} } from "${paths.factoryTo.repository}/${dependency.db}/${repo}"`);
        })
      }
      factoryCode.push(``);
      factoryCode.push(`export const ${name}Factory = () => {`);
      if(repositories){
        const repos = [];
        repositories.forEach(repo => {
          let repoConst = repo.replace('Repository','').split('').map(
            (char, i) => i === 0 ? char.toLowerCase() : char
          ).join('') + 'Repo';
          
          factoryCode.push(`  const ${repoConst} = new ${repo}();`);

          repos.push(repoConst);
        });
        factoryCode.push(``);
        factoryCode.push(`  const useCase = new ${name}${sufix.useCase}(`);
        factoryCode.push(`    ${repos.join(',\n    ')}`);
        factoryCode.push(`  );`);
      }else{
        factoryCode.push(`  const useCase = new ${name}${sufix.useCase}();`);
      }
      factoryCode.push(``);
      factoryCode.push(`  const controller = new ${name}Controller(useCase);`);
      factoryCode.push(``);
      factoryCode.push(`  return controller;`);
      factoryCode.push(`}`);
      
      const folderPath = path.join(__dirname, `${paths.factory}/${dir}`);
      this.__checkAndCreateFolder(folderPath);
      const filePath = path.join(folderPath, `${name}Factory.ts`);
      fs.writeFileSync(filePath, factoryCode.join('\n'));

      console.log(`(factory)    ${paths.factory}/${dir}/${name}Factory.ts`);
    }

    console.log('[created=files]\n');
    createUseCaseFile(dir, name, repositories);
    createControllerFile(dir, name);
    createFactoryFile(dir, name, repositories);
  }
}

const help = `help\n. . (Listar todas as funcionalidades executadas pelo artisan)\n\nmake: \n. . useCase --name='NomeDoCaso' --dir='NomeDaEntidade'  [--repositories='RepositoriosSeparadosPorVirgula']\n. . (Criar estrutura padrão do caso de uso gerando factory, controller e useCase)`;
if (process.argv.length < 3) {
  console.log(`=======================================\nEspecifique a ação que deseja executar:\n- - - - - - - - - - - - - - - - - - - -\n\n${help}`);
  process.exit()
} 

const args = process.argv.slice(2);

const automator = new Automator();

switch(args[0]){
  case 'make:useCase':
    const errorParams = "[make:useCase] É obrigatório infomar os parâmetros:\n\n  --name=(Nome base do caso de uso)\n  --dir=(Nome da entidade referida) [--repositories='RepositoriosSeparadosPorVirgula']";
    if(args.length < 3){
      console.log(errorParams)
      process.exit();
    }
    let name = null, dir = null, repositories = null;
    args.forEach(arg => {
      if(arg.includes('--name=')) name = arg.replace('--name=', '')
      if(arg.includes('--dir='))  dir  = arg.replace('--dir=','')
      if(arg.includes('--repositories=')){
        repositories = arg.replace('--repositories=','').split(',').filter(r => !!r && r.length > 0)
        if(repositories.length === 0) repositories = null;
      }
    })

    if(!name || name.length === 0 || !dir || dir.length === 0){
      console.log(errorParams)
      process.exit();
    }

    automator.makeUseCase(dir, name, repositories);
    break;
  case 'help':
    console.log(`=============\nHELP\n- - - - - - -\n\n${help}`);
    break
  default:
    console.log(`==========================================================\nFunção não existe. Verifique as funções existentes abaixo:\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - \n\n${help}`);
    break;
}