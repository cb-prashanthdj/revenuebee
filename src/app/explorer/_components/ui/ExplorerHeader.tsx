'use client';
import Image from 'next/image';
import ChargebeeIcon from '../_assets/chargebee-icon.svg';
import { ArrowRight } from 'lucide-react';

const ExplorerHeader = () => {
  return (
    <div className="flex justify-between p-4 isolate">
      <div className={`flex gap-3 items-center font-sora`}>
        <h1 className="flex gap-2 text-[1rem] leading-none">
          <Image src={ChargebeeIcon} alt="Chargebee" />
          API Explorer
        </h1>
        <p className={`m-0 leading-none mt-0.5 text-[1rem] font-inter`}>
          Discover. Experiment. Integrate.
        </p>
      </div>
      <div className="flex gap-2 items-center">
        <div>Do more with a Chargebee account</div>
        <button className="flex gap-1 py-[0.375rem] px-[1.25rem] justify-center items-center bg-shade-teal-500 bg-opacity-50 text-white text-sm font-semibold">
          Log in <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
};

export default ExplorerHeader;
