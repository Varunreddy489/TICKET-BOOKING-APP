import { Loader } from "lucide-react";

import { Card, CardContent } from "./card";

const Spinner = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <Card className="w-[90%] max-w-md bg-zinc-900 border-zinc-800">
        <CardContent className="flex flex-col items-center gap-4 pt-6">
          <Loader className="size-6 text-emerald-500 animate-spin" />
          <h3 className="text-zinc-400 text-xl font-bold">Please Wait</h3>
          <p className="text-zinc-400 text-sm">Processing...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Spinner;
