import { AppProvider } from "contexts/AppContext";

import Controls from "components/Controls/Controls";
import Feed from "components/Feed/Feed";
import Summary from "components/Summary/Summary";

export default function Root() {
  return (
    <div className="dark:bg-slate-900 bg-slate-100 flex flex-col items-center h-full w-full">
      <header className="w-full bg-blue-700 h-12 flex items-center p-2 md:p-4">
        <div className="prose dark:prose-invert">
          <h1>Twittertron</h1>
        </div>
      </header>
      <div className="flex-col w-full justify-center lg:w-[1024px] p-2 md:p-4">
        <AppProvider>
          <>
            <Controls />
            <div className="md:flex md:justify-between">
              <Feed trackIndex={0} />
              <br className="md:hidden" />
              <Feed trackIndex={1} />
            </div>
            <Summary />
          </>
        </AppProvider>
      </div>
    </div>
  );
}
