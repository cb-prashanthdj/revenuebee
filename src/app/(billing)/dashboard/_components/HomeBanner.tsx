import { Button, Banner, Link, Notification } from "cb-sting-react-ts";
import React from "react";
import { useSiteConfigStore } from "@/app/store/siteconfig/siteconfig-store";
import {BookOpen, LifeBuoy, OctagonAlert, SparklesIcon} from "lucide-react";

export const HomeBanner = () => {
  const { isTestSite } = useSiteConfigStore();
  return (
      <div>
        {!isTestSite ? (
            <Banner size="regular" theme="Default" variant="Hero">
              <div className="s-banner-buttons">
                <Button
                    onClick={() => {}}
                    size="regular"
                    styleType="default"
                    variant="primary"
                >
                  Click Me
                </Button>
                <Button
                    onClick={() => {}}
                    size="regular"
                    styleType="default"
                    variant="neutral"
                >
                  Learn More
                </Button>
              </div>
            </Banner>
        ) : (
            <div className={"px-8 pt-6"}>
              <Notification
                  size="regular"
                  variant="primary"
                  width="full"
                  close
                  iconContent={<SparklesIcon size={16} />}
              >
                <div className={'space-y-6'}>
                  <div className="flex flex-col justify-center gap-2 text-blue-900">
                    <h5 className="font-semibold text-blue-900">Welcome to your new test site</h5>
                    <p className={'m-0'}>
                      This is your place to explore and experiment. Test features,
                      configurations and workflows without impacting your critical site
                      setup.
                    </p>
                  </div>
                  <div className="flex gap-6">
                    <li className={"list-none"}>
                      <Link
                          href={"#"}
                          size="small"
                          className="font-semibold text-primary-500 hover:underline flex gap-2 items-center cursor-pointer"
                          styleType="text"
                      >
                  <span>
                    <BookOpen size={16} />
                  </span>
                        Reach Out to Support
                      </Link>
                    </li>
                    <li className={"list-none"}>
                      <Link
                          href={"#"}
                          size="small"
                          className="font-semibold text-primary-500 hover:underline flex gap-2 items-center cursor-pointer"
                          styleType="text"
                      >
                          <span>
                            <OctagonAlert size={16} />
                          </span>
                        Learn more about team management
                      </Link>
                    </li>
                  </div>
                </div>
              </Notification>
            </div>
        )}
      </div>
  );
};