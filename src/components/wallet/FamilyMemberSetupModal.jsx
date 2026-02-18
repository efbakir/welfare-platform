import { useState } from "react";
import Button from "../ui/Button";

const relationshipOptions = ["Partner", "Child", "Dependent"];

export default function FamilyMemberSetupModal({ onClose }) {
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("Partner");
  const [budget, setBudget] = useState(120);

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/45 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white shadow-xl">
        <div className="border-b border-gray-200 p-6">
          <h2 className="font-display text-xl font-bold text-text-primary">Add family member</h2>
          <p className="mt-1 text-sm text-text-secondary">
            Create a wallet profile and optionally allocate monthly budget now.
          </p>
        </div>

        <div className="space-y-4 p-6">
          <div>
            <label className="mb-2 block text-sm font-semibold text-text-primary">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-text-primary outline-none transition focus:border-blue"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-text-primary">Relationship</label>
            <select
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-text-primary outline-none transition focus:border-blue"
            >
              {relationshipOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 flex items-center justify-between text-sm font-semibold text-text-primary">
              Initial monthly budget
              <span className="font-display text-base text-blue">USD {budget}</span>
            </label>
            <input
              type="range"
              min={0}
              max={300}
              step={10}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
            />
            <p className="mt-2 text-xs text-text-muted">Optional. You can change allocation from Wallet later.</p>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-gray-200 p-6">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={onClose}>
            Save & Allocate
          </Button>
        </div>
      </div>
    </div>
  );
}
