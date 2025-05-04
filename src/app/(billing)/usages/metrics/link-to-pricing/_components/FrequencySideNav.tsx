"use client";

// FrequencySideNav.tsx
import { Button, Card, Link } from "cb-sting-react-ts";
import { Trash2 } from "lucide-react";
import React from "react";
import { useFrequencyStore } from "./../../../_store/frequency-store";

export const FrequencySideNav = () => {
  const selectedItems = useFrequencyStore((state) => state.selectedItems);
  const removeSelectedItem = useFrequencyStore(
    (state) => state.removeSelectedItem
  );

  const handleRemoveAll = () => {
    selectedItems.forEach((item) => removeSelectedItem(item));
  };

  if (selectedItems.length === 0) {
    return null;
  }

  return (
    <div className="space-y-regular">
      <div className="flex justify-between">
        <div className="font-semibold">
          {selectedItems.length} {selectedItems.length === 1 ? "item" : "items"}{" "}
          selected
        </div>
        <div>
          <Button variant="danger" styleType="text" onClick={handleRemoveAll}>
            Remove all
          </Button>
        </div>
      </div>

      <div className="space-y-regular">
        {selectedItems.map((item, index) => (
          <Card key={`${item.section}-${item.name}-${index}`}>
            <Card.Header
              title={`${item.section} ${item.name}`}
              actionElement={
                <Link
                  href="#"
                  decoration="none"
                  variant="neutral"
                  onClick={(e) => {
                    e.preventDefault();
                    removeSelectedItem(item);
                  }}
                >
                  <Trash2 size={16} />
                </Link>
              }
            />
            <Card.Content>
              <div className="font-semibold -mt-2">
                Included usage: <span>{item.tokens} conversations</span>
              </div>

              <div>Plan: {item.section}</div>
              <div>Product family: {item.productFamily || "Help desk"}</div>
            </Card.Content>
          </Card>
        ))}
      </div>
    </div>
  );
};
