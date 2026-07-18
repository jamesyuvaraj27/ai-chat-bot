import config from './config/index.js';
import app from './app.js';

const { port, nodeEnv, llm } = config;

app.listen(port, () => {
  console.log(`\n🚀 AI Echo Bot server running`);
  console.log(`   Environment : ${nodeEnv}`);
  console.log(`   Port        : ${port}`);
  console.log(`   LLM Provider: ${llm.provider}`);
  console.log(`   URL         : http://localhost:${port}\n`);
});
