import { NavigationItem } from '@/app/types/JumpToNavType';
import { Tabs, TabsList } from 'cb-sting-react-ts'
import React, { useCallback, useEffect, useMemo } from 'react'


interface LeftJumpToNavProps {
    navigationItems: NavigationItem[];
    title?: string;
    description?: string;
    onNavigate?: (item: NavigationItem) => void;
    className?: string;
    defaultTabId?: string;
    offset?: number;
  }

const LeftJumpToNav:React.FC<LeftJumpToNavProps> = ({
    navigationItems,
  title,
  description,
  onNavigate,
  className,
  defaultTabId,
  offset = 80
}) => {

     
    const scrollToSection = useCallback((sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
          const top = section.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, [offset]);

          const handleValueChange = useCallback((value: string) => {
          
            if (onNavigate) {
                const item = navigationItems.find((item) => item.id === value);
                if (item) {
                    scrollToSection(item.sectionId);
                    onNavigate(item);
                  }
          
            } else {
                console.log(value);
            //   router.push(item.href);
            }
          }, [onNavigate, scrollToSection
            //router
        ]);

        useEffect(() => {
            const handleScroll = () => {
              const sections = navigationItems.map(item => 
                document.getElementById(item.sectionId)
              ).filter(Boolean);
        
              const current = sections.find(section => {
                if (!section) return false;
                const rect = section.getBoundingClientRect();
                return rect.top <= offset + 50 && rect.bottom > offset;
              });
        
              if (current) {
                const activeItem = navigationItems.find(item => 
                  item.sectionId === current.id
                );
                if (activeItem) {
                  // Update active tab visually
                  const tabElement = document.querySelector(`[data-tab-id="${activeItem.id}"]`);
                  if (tabElement) {
                    tabElement.setAttribute('aria-selected', 'true');
                  }
                }
              }
            };
        
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
          }, [navigationItems, offset]);

        const formattedTabs = useMemo(() => {
            return navigationItems.map(item => ({
              id: item.id,
              title: item.title,
              //icon: item.icon,
              disabled: item.disabled
            }));
          }, [navigationItems]);
        
         

  return (
    <div className={`sticky top-20 ${className || ''}`}>
    <Tabs
    defaultTabID={defaultTabId || formattedTabs[0]?.id}
  onValueChange={handleValueChange}
  tabId="tab1"
>
  <TabsList
    size="regular"
    tabStyle="lined"
    tabs={formattedTabs}
    variant="vertical"
    width="full"
  />    
 
</Tabs>
</div>
  )
}

export default LeftJumpToNav