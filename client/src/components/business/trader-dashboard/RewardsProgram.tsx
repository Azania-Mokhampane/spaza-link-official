import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { defaultTemplates } from "@/data";
import type { RewardTemplate } from "@/lib/types";
import { CheckCircle2, Gift, Plus, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const RewardsProgram = () => {
  const [activeRewards, setActiveRewards] = useState<string[]>([]);
  const [customRewards, setCustomRewards] = useState<RewardTemplate[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const allRewards = [...defaultTemplates, ...customRewards];

  const addCustomReward = () => {
    if (!newLabel.trim()) return;
    const reward: RewardTemplate = {
      id: `custom-${Date.now()}`,
      label: newLabel.trim(),
      description: newDesc.trim() || "Custom reward for your customers.",
      isCustom: true,
    };
    setCustomRewards((prev) => [...prev, reward]);
    setActiveRewards((prev) => [...prev, reward.id]);
    setNewLabel("");
    setNewDesc("");
    setShowAddForm(false);
  };
  const toggleReward = (id: string) => {
    setActiveRewards((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const removeCustomReward = (id: string) => {
    setCustomRewards((prev) => prev.filter((r) => r.id !== id));
    setActiveRewards((prev) => prev.filter((r) => r !== id));
  };
  return (
    <section className="rounded-xl border border-border bg-card p-4 space-y-3">
      <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
        <Gift className="h-4 w-4" />
        Enable Rewards
      </h3>
      <p className="text-xs text-muted-foreground">
        Choose from templates or create your own custom rewards.
      </p>
      <div className="space-y-2">
        {allRewards.map((reward) => {
          const isActive = activeRewards.includes(reward.id);
          return (
            <button
              key={reward.id}
              onClick={() => toggleReward(reward.id)}
              className={`flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-colors ${
                isActive
                  ? "border-primary bg-primary/5"
                  : "border-border bg-background hover:bg-muted/50"
              }`}
            >
              <div
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  isActive
                    ? "border-primary bg-primary"
                    : "border-muted-foreground/30"
                }`}
              >
                {isActive && (
                  <CheckCircle2 className="h-3 w-3 text-primary-foreground" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">
                  {reward.label}
                  {reward.isCustom && (
                    <Badge
                      variant="secondary"
                      className="ml-1.5 px-1.5 py-0 text-[10px]"
                    >
                      Custom
                    </Badge>
                  )}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {reward.description}
                </p>
              </div>
              {reward.isCustom && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeCustomReward(reward.id);
                  }}
                  className="mt-0.5 shrink-0 rounded-full p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  aria-label={`Remove ${reward.label}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </button>
          );
        })}
      </div>

      {/* Add Custom Reward */}
      {showAddForm ? (
        <div className="space-y-2 rounded-lg border border-dashed border-primary/30 bg-primary/5 p-3">
          <Input
            placeholder="Reward name (e.g. Buy 5, get 1 free)"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            className="h-9 text-sm"
          />
          <Input
            placeholder="Description (optional)"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            className="h-9 text-sm"
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1 gap-1"
              onClick={addCustomReward}
              disabled={!newLabel.trim()}
            >
              <Plus className="h-3.5 w-3.5" />
              Add Reward
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setShowAddForm(false);
                setNewLabel("");
                setNewDesc("");
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-1.5"
          onClick={() => setShowAddForm(true)}
        >
          <Plus className="h-3.5 w-3.5" />
          Add Custom Reward
        </Button>
      )}
      <Button
        variant="landing"
        size="lg"
        className="w-full gap-2"
        disabled={activeRewards.length === 0}
        onClick={() => {
          const count = activeRewards.length;
          toast("Rewards activated!", {
            description: `${count} reward${count > 1 ? "s" : ""} now available to your customers.`,
          });
        }}
      >
        <Gift className="h-4 w-4" />
        Activate Rewards ({activeRewards.length})
      </Button>
    </section>
  );
};

export default RewardsProgram;
