'use client'

import { SelectMenu, SelectItem, Input as InputField, STable as Table, Popover, PopoverTrigger, PopoverContent, Card, Button, Link } from 'cb-sting-react-ts';
import { Info, MoreHorizontal, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

interface FrequencyItem {
  section: string;
  name: string;
  tokens: string;
  productFamily?: string;
}

interface FrequencyData {
  section: string;
  frequencies: {
    name: string;
    tokens: string;
    isChecked: boolean;
  }[];
}

// Main container component to manage shared state
const FrequencyContainer = () => {
  const [selectedItems, setSelectedItems] = useState<FrequencyItem[]>([]);

  const handleItemSelect = (item: FrequencyItem) => {
    setSelectedItems(prev => [...prev, item]);
  };

  const handleItemRemove = (itemToRemove: FrequencyItem) => {
    setSelectedItems(prev => prev.filter(item => 
      !(item.section === itemToRemove.section && 
        item.name === itemToRemove.name)
    ));
  };

  const handleRemoveAll = () => {
    setSelectedItems([]);
  };

  return (
    <div className="flex gap-8">
      <div className="flex-grow">
        <IncludedUsage 
          selectedItems={selectedItems}
          onItemSelect={handleItemSelect}
          onItemRemove={handleItemRemove}
        />
      </div>
      <div className="w-80">
        <FrequencySideNav 
          selectedItems={selectedItems}
          onItemRemove={handleItemRemove}
          onRemoveAll={handleRemoveAll}
        />
      </div>
    </div>
  );
};

// SideNav Component
interface FrequencySideNavProps {
  selectedItems: FrequencyItem[];
  onItemRemove: (item: FrequencyItem) => void;
  onRemoveAll: () => void;
}

const FrequencySideNav: React.FC<FrequencySideNavProps> = ({
  selectedItems,
  onItemRemove,
  onRemoveAll
}) => {
  return (
    <div className='space-y-regular'>
      {selectedItems.length > 0 && (
        <div className='flex justify-between'>
          <div className='font-semibold'>{selectedItems.length} items selected</div>
          <div>
            <Button variant='danger' styleType="text" onClick={onRemoveAll}>
              Remove all
            </Button>
          </div>
        </div>
      )}

      <div className='space-y-regular'>
        {selectedItems.map((item, index) => (
          <Card key={`${item.section}-${item.name}-${index}`}>
            <Card.Header 
              title={`${item.section} ${item.name}`}
              actionElement={
                <Link 
                  href='#'
                  decoration="none"
                  variant="neutral"
                  onClick={() => onItemRemove(item)}
                >
                  <Trash2 size={16} />
                </Link>
              } 
            />
            <Card.Content>
              <div>Included usage: {item.tokens} tokens</div>
              <div>Plan: {item.section}</div>
              <div>Product family: {item.productFamily || 'Professional'}</div>
            </Card.Content>
          </Card>
        ))}
      </div>
    </div> 
  );
};

// Modified IncludedUsage component with selection handling
interface IncludedUsageProps {
  selectedItems: FrequencyItem[];
  onItemSelect: (item: FrequencyItem) => void;
  onItemRemove: (item: FrequencyItem) => void;
}

const IncludedUsage: React.FC<IncludedUsageProps> = ({
  selectedItems,
  onItemSelect,
  onItemRemove
}) => {
  const handleClickView = () => {
    // Handle view variant click
  };

  return (
    <div>
      <div className="space-y-8">
        <div>Select plans or add-ons that provide included usage for a set price from below.</div>
        <div className="w-2/3">
          <div className="flex justify-between mb-4">
            <div className="w-1/4">
              <InputField
                iconName=""
                inputSize="regular"
                inputWidth="inline"
                label="default"
                onChangeLogic={() => {}}
                placeholder="Search for a plan from your product catalog"
                type="text"
                variant="search"
                withIcon
              />
            </div>
            <div>
              <SelectMenu
                label="inline"
                labelText="Filter by:"
                onValueChange={() => {}}
                placeholder="Plans"
                size="regular"
                value="Test"
                widthMenu="inline"
              >
                <SelectItem value="Option 1">Option 1</SelectItem>
                <SelectItem value="Option 2">Option 2</SelectItem>
                <SelectItem value="Option 3">Option 3</SelectItem>
              </SelectMenu>
            </div>
          </div>
          <FrequencyTable 
            onClickView={handleClickView}
            selectedItems={selectedItems}
            onItemSelect={onItemSelect}
            onItemRemove={onItemRemove}
          />
        </div>
      </div>
    </div>
  );
};

// Modified FrequencyTable component
interface FrequencyTableProps {
  onClickView?: () => void;
  selectedItems: FrequencyItem[];
  onItemSelect: (item: FrequencyItem) => void;
  onItemRemove: (item: FrequencyItem) => void;
}

const FrequencyTable: React.FC<FrequencyTableProps> = ({ 
  onClickView,
  selectedItems,
  onItemSelect,
  onItemRemove
}) => {
  const [tableData, setTableData] = useState<FrequencyData[]>([
    {
      section: 'Scale',
      frequencies: [
        { name: 'Daily', tokens: '', isChecked: false },
        { name: 'Weekly', tokens: '', isChecked: false },
        { name: 'Monthly', tokens: '', isChecked: false },
        { name: 'Yearly', tokens: '', isChecked: false },
      ],
    },
    {
      section: 'Professional',
      frequencies: [
        { name: 'Daily', tokens: '', isChecked: false },
        { name: 'Weekly', tokens: '', isChecked: false },
        { name: 'Monthly', tokens: '', isChecked: false },
        { name: 'Yearly', tokens: '', isChecked: false },
      ],
    },
    {
      section: 'Enterprise',
      frequencies: [
        { name: 'Daily', tokens: '', isChecked: false },
        { name: 'Weekly', tokens: '', isChecked: false },
        { name: 'Monthly', tokens: '', isChecked: false },
        { name: 'Yearly', tokens: '', isChecked: false },
      ],
    },
  ]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, sectionIndex: number, frequencyIndex: number) => {
    const frequency = tableData[sectionIndex].frequencies[frequencyIndex];
    
    if (frequency.tokens.trim() === '') {
      return;
    }

    const isChecked = event.target.checked;
    const section = tableData[sectionIndex].section;
    const item: FrequencyItem = {
      section,
      name: frequency.name,
      tokens: frequency.tokens,
      productFamily: 'Professional'
    };

    setTableData(prevData => {
      const newData = [...prevData];
      newData[sectionIndex].frequencies[frequencyIndex].isChecked = isChecked;
      return newData;
    });

    if (isChecked) {
      onItemSelect(item);
    } else {
      onItemRemove(item);
    }
  };

  const handleTokenChange = (value: string, sectionIndex: number, frequencyIndex: number) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setTableData(prevData => {
      const newData = [...prevData];
      newData[sectionIndex] = {
        ...newData[sectionIndex],
        frequencies: [...newData[sectionIndex].frequencies]
      };
      newData[sectionIndex].frequencies[frequencyIndex] = {
        ...newData[sectionIndex].frequencies[frequencyIndex],
        tokens: numericValue
      };
      return newData;
    });
  };

  return (
    <div>
      <Table mode="light" border="horizontal" className="border border-neutral-200">
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell align="left">
              <div className="flex items-center gap-2">
                Item - frequency
                <Info className="w-4 h-4 text-neutral-500" />
              </div>
            </Table.HeaderCell>
            <Table.HeaderCell align="left">Enter included usage</Table.HeaderCell>
            <Table.HeaderCell align="right"> </Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {tableData.map((section, sectionIndex) => (
            <React.Fragment key={section.section}>
              <Table.Row>
                <Table.Cell className="font-medium bg-neutral-25" colSpan={3}>
                  {section.section}
                </Table.Cell>
              </Table.Row>
              {section.frequencies.map((frequency, frequencyIndex) => (
                <Table.Row key={`${section.section}-${frequency.name}`}>
                  <Table.Cell className="flex items-center gap-3 leading-[0]">
                    <input
                      type="checkbox"
                      checked={frequency.isChecked}
                      onChange={(e) => handleCheckboxChange(e, sectionIndex, frequencyIndex)}
                      className={`rounded border-neutral-300 w-4 h-4 ${frequency.tokens.trim() === '' ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                    />
                    <span className="text-sm">{frequency.name}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <InputField
                        value={frequency.tokens}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                          handleTokenChange(e.target.value, sectionIndex, frequencyIndex)
                        }
                        placeholder="Enter tokens"
                        inputSize="regular"
                      />
                      <span className="text-sm text-neutral-500">tokens</span>
                    </div>
                  </Table.Cell>
                  <Table.Cell align="right">
                    <Popover modal onOpenChange={() => {}}>
                      <PopoverTrigger asChild>
                        <button className="p-1 hover:bg-neutral-100 rounded-full">
                          <MoreHorizontal className="w-4 h-4 cursor-pointer" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent
                        align="start"
                        alignOffset={5}
                        arrowColour="s-fill-primary-50"
                        className="bg-white shadow-md flex p-2 s-text-center s-rounded-lg"
                        side="right"
                        sideOffset={5}
                      >
                        <div onClick={onClickView} className="cursor-pointer">
                          View currencies and variants
                        </div>
                      </PopoverContent>
                    </Popover>
                  </Table.Cell>
                </Table.Row>
              ))}
            </React.Fragment>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export { FrequencyContainer };