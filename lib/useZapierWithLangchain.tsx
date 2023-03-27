const { OpenAI } = require('langchain');
const { initializeAgentExecutor, ZapierToolKit } = require('langchain/agents');
const { ZapierNLAWrapper } = require('langchain/tools');

export async function useZapierWithLangchain({ title, contentHtml }: Props) {
  

  const model = new OpenAI({ openAIApiKey: 'YOUR_API_KEY' });
  const zapier = new ZapierNLAWrapper();
  const toolkit = await ZapierToolKit.fromZapierNLAWrapper(zapier);

  const executor = await initializeAgentExecutor(
    toolkit.tools,
    model,
    'zero-shot-react-description',
    true
  );
  const to = 'meliodas5770@gmail.con';
  const subject = 'Test';
  const body = 'This is a test email.';

  const sendEmail = async (to: string, subject: string, body: string) => {
    const input = `Send an email to ${to} with the subject "${subject}" and the body "${body}".`;

    const result = await executor.call({ input });

    const { email } = result.output;

    return email;
  };
}



// import { OpenAI } from "langchain";
// import { initializeAgentExecutor, ZapierToolKit } from "langchain/agents";
// import { ZapierNLAWrapper } from "langchain/tools";

// type Props = {
//     postId: string,
//     title: string,
//     date: string,
//     contentHtml: string
// }


// export const useZapierWithLangchain = async ({ title, contentHtml }: Props) => {
//     const model = new OpenAI({ temperature: 0 });
//     const zapier = new ZapierNLAWrapper();
//     const toolkit = await ZapierToolKit.fromZapierNLAWrapper(zapier);

//     const executor = await initializeAgentExecutor(
//         toolkit.tools,
//         model,
//         "zero-shot-react-description",
//         true
//     );
//     console.log("Loaded agent.");

//     for (const tool of toolkit.tools) {
//         console.log(`You can use: ${tool.name}`);
//     }

//     const emails = ["meliodas5770@gmail.com"];

//     const input = `Summarize this text "${contentHtml}" and email it to ${emails}, with the subject being ${title}.`;

//     console.log(`Executing with input "${input}"...`);

//     const result = await executor.call({ input });

//     console.log(`Got output ${result.output}`);
// };