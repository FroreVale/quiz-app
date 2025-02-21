import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type IntroProps = {
    onPlay: () => void;
}

export function Intro({onPlay}: IntroProps) {
  return (
    <>
      <Card className="max-w-[600px]">
        <CardHeader>
          <CardTitle className="text-center text-3xl">Quiz Challenge</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center">
            Answer 10 questions, each with a 30-second timer. Stay focused and
            try to get the highest score.
          </p>
          <div className="flex justify-center mt-4">
            <Button onClick={onPlay}>Play</Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
