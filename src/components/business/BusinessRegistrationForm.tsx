import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Input } from "../ui/input";
import { MapPin, Shield } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CATEGORIES } from "@/data";

export type BusinessFormData = {
  businessName: string;
  ownerName: string;
  ownerIdNumber: string;
  phoneNumber: string;
  category: string;
  location: string;
  cipcCompliant: "yes" | "no" | "unsure" | "";
};

type IBusinessRegistrationFormProps = {
  onSubmit: (data: BusinessFormData) => void;
};

const BusinessRegistrationForm = ({
  onSubmit,
}: IBusinessRegistrationFormProps) => {
  // Using useState for now but we should move to either tanstack forms, react hook form or formik
  const [form, setForm] = useState<BusinessFormData>({
    businessName: "",
    ownerName: "",
    ownerIdNumber: "",
    phoneNumber: "",
    category: "",
    location: "",
    cipcCompliant: "",
  });

  const [locationMethod, setLocationMethod] = useState<
    "auto" | "manual" | null
  >(null);

  const update = (field: keyof BusinessFormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const isComplete =
    form.businessName.trim() &&
    form.ownerName.trim() &&
    form.ownerIdNumber.trim() &&
    form.phoneNumber.trim() &&
    form.category &&
    form.location.trim() &&
    form.cipcCompliant;

  const handleAutoDetect = () => {
    setLocationMethod("auto");
    update("location", "Soweto, Gauteng (detected)");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <section>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
          Register Your Business
        </h1>
        <p className="mt-2 text-base leading-relaxed text-muted-foreground">
          Tell us a bit about your business to get started.
        </p>
      </section>

      {/* Form */}
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          if (isComplete) onSubmit(form);
        }}
      >
        {/* Business Name */}
        <div className="space-y-1.5">
          <Label htmlFor="businessName">Business Name</Label>
          <Input
            id="businessName"
            placeholder="e.g. Mpho's Spaza"
            value={form.businessName}
            onChange={(e) => update("businessName", e.target.value)}
            className="h-12 text-base"
          />
        </div>

        {/* Owner Name */}
        <div className="space-y-1.5">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            placeholder="Full name"
            value={form.ownerName}
            onChange={(e) => update("ownerName", e.target.value)}
            className="h-12 text-base"
          />
        </div>

        {/* Owner ID Number */}
        <div className="space-y-1.5">
          <Label htmlFor="ownerIdNumber">Owner ID Number</Label>
          <Input
            id="ownerIdNumber"
            placeholder="13-digit ID number"
            inputMode="numeric"
            value={form.ownerIdNumber}
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, "").slice(0, 13);
              update("ownerIdNumber", v);
            }}
            className="h-12 text-base"
          />
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Shield className="h-3 w-3" />
            Your ID is kept safe and only used for registration.
          </p>
        </div>

        {/* Phone Number */}
        <div className="space-y-1.5">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            placeholder="e.g. 071 234 5678"
            inputMode="tel"
            value={form.phoneNumber}
            onChange={(e) => {
              const v = e.target.value.replace(/[^\d\s]/g, "").slice(0, 12);
              update("phoneNumber", v);
            }}
            className="h-12 text-base"
          />
        </div>

        {/* Business Category */}
        <div className="space-y-1.5">
          <Label>Business Category</Label>
          <Select
            value={form.category}
            onValueChange={(v) => update("category", v)}
          >
            <SelectTrigger className="h-12 text-base">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Business Location */}
        <div className="space-y-2">
          <Label>Business Location</Label>
          {!locationMethod && (
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="h-12 flex-1 text-sm"
                onClick={handleAutoDetect}
              >
                <MapPin className="mr-1.5 h-4 w-4" />
                Auto-detect
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-12 flex-1 text-sm"
                onClick={() => setLocationMethod("manual")}
              >
                Select area
              </Button>
            </div>
          )}
          {locationMethod === "auto" && (
            <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2.5">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm text-foreground">{form.location}</span>
              <button
                type="button"
                className="ml-auto text-xs text-primary underline"
                onClick={() => {
                  setLocationMethod(null);
                  update("location", "");
                }}
              >
                Change
              </button>
            </div>
          )}
          {locationMethod === "manual" && (
            <div className="space-y-1.5">
              <Input
                placeholder="e.g. Diepsloot, Johannesburg"
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                className="h-12 text-base"
              />
              <button
                type="button"
                className="text-xs text-primary underline"
                onClick={() => {
                  setLocationMethod(null);
                  update("location", "");
                }}
              >
                Change method
              </button>
            </div>
          )}
        </div>

        {/* CIPC Compliance */}
        <div className="space-y-2">
          <Label>Is your business CIPC registered?</Label>
          <RadioGroup
            value={form.cipcCompliant}
            onValueChange={(v) => update("cipcCompliant", v)}
            className="flex flex-col gap-2"
          >
            {[
              { value: "yes", label: "Yes, my business is CIPC registered" },
              { value: "no", label: "No, not yet" },
              { value: "unsure", label: "I'm not sure" },
            ].map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 transition-colors hover:bg-muted/50 has-checked:border-primary has-checked:bg-primary/5"
              >
                <RadioGroupItem value={option.value} />
                <span className="text-sm text-foreground">{option.label}</span>
              </label>
            ))}
          </RadioGroup>

          {(form.cipcCompliant === "no" || form.cipcCompliant === "unsure") && (
            <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 space-y-1">
              <p className="text-sm font-medium text-foreground">
                We've got you covered
              </p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Spaza Link can help you register with CIPC as part of
                formalising your business. It's simple, and we'll guide you
                through every step — no paperwork stress.
              </p>
            </div>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          variant="landing"
          size="xl"
          className="w-full"
          disabled={!isComplete}
        >
          Register Business
        </Button>
      </form>
    </div>
  );
};

export default BusinessRegistrationForm;
