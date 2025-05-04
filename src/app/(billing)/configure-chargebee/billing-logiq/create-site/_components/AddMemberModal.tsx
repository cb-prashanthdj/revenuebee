import React, { useState, useEffect } from "react";
import {
  SModal,
  Button,
  Input,
  Card,
  CStackedList,
  CStackedItem,
} from "cb-sting-react-ts";
import { PlusIcon } from "lucide-react";

// Make sure this interface matches exactly with the one in your store
interface TeamMember {
  id?: string;
  name?: string;
  email?: string;
  leftAvatar?: string;
}

interface AddMembersProps {
  disableAddMember: boolean;
  selectedTeamMembers: string[];
  setSelectedTeamMembers: (members: string[]) => void;
  teamMembers: TeamMember[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AddMemberModal: React.FC<AddMembersProps> = ({
                                                     disableAddMember,
                                                     selectedTeamMembers,
                                                     setSelectedTeamMembers,
                                                     teamMembers,
                                                     isOpen,
                                                     setIsOpen,
                                                   }) => {
  // Initialize localSelectedMembers with parent's state
  const [localSelectedMembers, setLocalSelectedMembers] = useState<string[]>(
      []
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

  // For debugging - check team members passed to modal
  useEffect(() => {
    console.log("Team members in modal:", teamMembers);
    console.log("Currently selected team members:", selectedTeamMembers);
  }, [teamMembers, selectedTeamMembers]);

  // Sync local state with parent state when selected members change
  useEffect(() => {
    setLocalSelectedMembers(selectedTeamMembers);
  }, [selectedTeamMembers]);

  // Sync local state with parent state when modal opens
  useEffect(() => {
    if (isOpen) {
      setLocalSelectedMembers(selectedTeamMembers);
      setSearchTerm("");
    }
  }, [isOpen, selectedTeamMembers]);

  // Handle selection inside modal
  const handleSelectMember = (id: string) => {
    // If already at max selection (3) and trying to add a new one, don't allow it
    if (
        !localSelectedMembers.includes(id) &&
        localSelectedMembers.length >= 3
    ) {
      return; // Don't add if already at max
    }

    // Toggle selection
    if (localSelectedMembers.includes(id)) {
      setLocalSelectedMembers(
          localSelectedMembers.filter((memberId) => memberId !== id)
      );
    } else {
      setLocalSelectedMembers([...localSelectedMembers, id]);
    }
  };

  // Confirm Selection and Close Modal
  const handleConfirmSelection = () => {
    setSelectedTeamMembers(localSelectedMembers);
    setIsOpen(false);
    console.log("Final selected members:", localSelectedMembers);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const getEmailForMember = (member: TeamMember): string => {
    if (member.email) return member.email;

    if (member.name) {
      const formattedName = member.name.toLowerCase().replace(/\s+/g, ".");
      return `${formattedName}@example.com`;
    }

    // Fallback email
    return "user@example.com";
  };

  const filteredTeamMembers = teamMembers.filter((member) => {
    const memberId = member.id || "";

    const isAlreadySelected = selectedTeamMembers.includes(memberId) &&
        !localSelectedMembers.includes(memberId);

    if (isAlreadySelected) {
      return false;
    }

    const memberName = member.name || "";
    const memberEmail = getEmailForMember(member);

    return (
        memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        memberEmail.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Check if there are any team members available to add
  const hasAvailableMembers = teamMembers.some(
      (member) => member.id && !selectedTeamMembers.includes(member.id)
  );

  return (
      <SModal.Root open={isOpen} onOpenChange={setIsOpen}>
        <SModal.Trigger asChild>
          <Button
              variant="primary"
              styleType={"outline"}
              disabled={disableAddMember || !hasAvailableMembers}
              onClick={() => setIsOpen(true)}
          >
            <PlusIcon className="size-3" /> Add Team Member
          </Button>
        </SModal.Trigger>

        <SModal.Content size="small" variant="default">
          <SModal.Header>
            <SModal.Title className="text-base">Add Team Members</SModal.Title>
          </SModal.Header>

          <SModal.Body className="py-4 px-1 space-y-4">
            {/* Search Input */}
            <Input
                inputSize="regular"
                inputWidth="full"
                messageText=""
                onChangeLogic={handleSearchChange}
                placeholder="Search by name or email"
                type="text"
                variant="search"
                value={searchTerm}
            />

            {/* Team Members List */}
            <Card padding={null}>
              <CStackedList
                  border="solid"
                  selectable
                  divider
                  onItemClick={() => {}}
                  selectionType="multiple"
                  variant="dashed"
              >
                {filteredTeamMembers.map((member) => {
                  const email = getEmailForMember(member);
                  const isChecked = member.id ? localSelectedMembers.includes(member.id) : false;

                  return (
                      <CStackedItem
                          key={member.id}
                          checked={isChecked}
                          id={member.id || ""}
                          onItemClick={() =>
                              member.id && handleSelectMember(member.id)
                          }
                          subTitle={email}
                          title={member.name || "Unknown Member"}
                          variant="default"
                      />
                  );
                })}
                {filteredTeamMembers.length === 0 && (
                    <div className="p-4 text-center text-gray-500">
                      {searchTerm
                          ? "No team members match your search"
                          : "No team members available to add"}
                    </div>
                )}
              </CStackedList>
            </Card>
          </SModal.Body>

          <SModal.Footer>
            <Button
                variant="neutral"
                onClick={() => {
                  setLocalSelectedMembers(selectedTeamMembers); // Reset to original selection
                  setIsOpen(false);
                }}
            >
              Cancel
            </Button>

            {/* Confirm Button updates parent state and closes modal */}
            <Button
                onClick={handleConfirmSelection}
                disabled={localSelectedMembers.length > 3}
            >
              Confirm Selection
            </Button>
          </SModal.Footer>
        </SModal.Content>
      </SModal.Root>
  );
};

export { AddMemberModal };