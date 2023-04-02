import { OpenAI } from "langchain";
import { initializeAgentExecutor, ZapierToolKit } from "langchain/agents";
import { ZapierNLAWrapper } from "langchain/tools";

type Props = {
    postId: string,
    title: string,
    date: string,
    contentHtml: string,
    requestInput: string
}

export const useZapierWithLangchain = async ({ title, contentHtml, requestInput }: Props) => {

    const model = new OpenAI({ temperature: 0 });
    const zapier = new ZapierNLAWrapper();
    const toolkit = await ZapierToolKit.fromZapierNLAWrapper(zapier);
  
    const executor = await initializeAgentExecutor(
      toolkit.tools,
      model,
      "zero-shot-react-description",
      true
    );

    for (const tool of toolkit.tools) {
      console.log(`Loaded tool ${tool.name}`);
    }

    console.log("Loaded agent.");

    const emails = ["gormerywanjiru@gmail.com", "meliodas5770@gmail.com", "gormerykombo@gmail.com", "valiantlynxz@gmail.com"];
    const twitter = ["@valiantlynxz"];

    const input = `Summarize this text: "${contentHtml}". Afterwards ${requestInput}.if there is some input missing just guess. if any error happens retry up to 3 times.`;
  
    console.log(`Executing with input "${input}"...`);
  
    const result = await executor.call({ input });
  
    console.log(`Got output: ${result.output}`);
    
    return result.output;
};