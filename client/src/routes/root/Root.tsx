import { AppProvider } from "contexts/AppContext";

import Summary from "components/Charts/Summary";
import Controls from "components/Controls";
import Feeds from "components/Feeds";

export default function Root() {
  return (
    <div className="dark:bg-slate-900 bg-slate-100 flex flex-col items-center min-h-screen w-full">
      <header className="fixed w-full bg-blue-700 h-12 flex items-center p-2 md:p-4">
        <div className="prose dark:prose-invert">
          <h1>Twittertron</h1>
        </div>
      </header>
      <div className="flex-col w-full justify-center lg:w-[1024px] p-2 md:p-4 mt-12">
        <AppProvider>
          <>
            <Controls />
            <Feeds />
            <Summary />
          </>
        </AppProvider>
      </div>
    </div>
  );
}
