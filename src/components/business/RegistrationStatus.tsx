import { ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { Button } from "../ui/button";

type IRegistrationStatusProps = {
  onContinue: () => void;
};

const steps = [
  { label: "Business information submitted", done: true },
  { label: "CIPC registration processing", done: false },
  { label: "Business listing being set up", done: false },
];
const RegistrationStatus = ({ onContinue }: IRegistrationStatusProps) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
          Business Registration in Progress
        </h1>
        <p className="mt-2 text-base leading-relaxed text-muted-foreground">
          We're helping formalise your business and make it visible to your
          community.
        </p>
      </section>

      {/* Checklist */}
      <section className="rounded-xl border border-border bg-card p-5">
        <ul className="space-y-5">
          {steps.map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              {step.done ? (
                <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
              ) : (
                <Clock className="mt-0.5 h-6 w-6 shrink-0 text-muted-foreground" />
              )}
              <div>
                <p
                  className={`text-base font-medium ${
                    step.done ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </p>
                <p className="text-xs text-muted-foreground/70">
                  {step.done ? "Complete" : "In progress"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <Button
        variant="landing"
        size="xl"
        className="w-full"
        onClick={onContinue}
      >
        Continue to Dashboard
        <ArrowRight className="ml-1.5 h-4 w-4" />
      </Button>
    </div>
  );
};

export default RegistrationStatus;
