import { CardHeader } from "./cardheader";
import { Card } from "cb-sting-react-ts";
import React from "react";

const StatGraph = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card depth="regular" padding="regular">
        <CardHeader title="Total Billing" />
        <div className="flex items-center gap-3">
          <span className="s-h2">$17.13M</span>
          <span className="leading-4">Dec $1.43M</span>
        </div>
        <div className="h-64">
          <div className="w-full h-64">
            <svg
              className="w-full h-full"
              preserveAspectRatio="none"
              viewBox="0 0 2000 1000"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 994.605c8.97-3.147 51.06-19.509 69-24.202 17.94-4.693 51.06-4.219 69-11.899 17.94-7.68 51.06-40.008 69-47.177 17.94-7.17 51.06-2.556 69-7.97 17.94-5.415 51.06-20.24 69-33.679 17.94-13.438 51.06-64.216 69-69.693 17.94-5.478 51.06 33.247 69 27.559 17.94-5.689 51.06-56.929 69-71.316 17.94-14.388 51.06-27.046 69-39.358 17.94-12.313 51.06-55.545 69-55.351 17.94.194 51.06 41.885 69 56.843 17.94 14.957 51.06 70.497 69 58.213 17.94-12.284 51.06-130.097 69-152.707 17.94-22.61 51.06-26.591 69-21.217 17.94 5.374 51.06 72.666 69 62.557 17.94-10.11 51.06-137.804 69-140.321 17.94-2.518 51.06 136.821 69 120.955 17.94-15.867 51.06-206.949 69-243.005 17.94-36.057 51.06-37.494 69-34.355 17.94 3.14 51.06 43.029 69 58.505 17.94 15.476 51.06 45.482 69 60.542 17.94 15.06 51.06 78.375 69 55.302 17.94-23.074 51.06-205.877 69-232.79 17.94-26.912 51.06 19.004 69 25.773 17.94 6.769 51.06 28.437 69 26.296 17.94-2.14 51.06-13.764 69-42.759 17.94-28.995 51.06-167.775 69-180.28 17.94-12.503 51.06 91.88 69 84.095 17.94-7.784 60.03-125.26 69-143.977L2000 1000H0Z"
                fill="#0472e11a"
              />
              <path
                d="M0 994.605c8.97-3.147 51.06-19.509 69-24.202 17.94-4.693 51.06-4.219 69-11.899 17.94-7.68 51.06-40.008 69-47.177 17.94-7.17 51.06-2.556 69-7.97 17.94-5.415 51.06-20.24 69-33.679 17.94-13.438 51.06-64.216 69-69.693 17.94-5.478 51.06 33.247 69 27.559 17.94-5.689 51.06-56.929 69-71.316 17.94-14.388 51.06-27.046 69-39.358 17.94-12.313 51.06-55.545 69-55.351 17.94.194 51.06 41.885 69 56.843 17.94 14.957 51.06 70.497 69 58.213 17.94-12.284 51.06-130.097 69-152.707 17.94-22.61 51.06-26.591 69-21.217 17.94 5.374 51.06 72.666 69 62.557 17.94-10.11 51.06-137.804 69-140.321 17.94-2.518 51.06 136.821 69 120.955 17.94-15.867 51.06-206.949 69-243.005 17.94-36.057 51.06-37.494 69-34.355 17.94 3.14 51.06 43.029 69 58.505 17.94 15.476 51.06 45.482 69 60.542 17.94 15.06 51.06 78.375 69 55.302 17.94-23.074 51.06-205.877 69-232.79 17.94-26.912 51.06 19.004 69 25.773 17.94 6.769 51.06 28.437 69 26.296 17.94-2.14 51.06-13.764 69-42.759 17.94-28.995 51.06-167.775 69-180.28 17.94-12.503 51.06 91.88 69 84.095 17.94-7.784 60.03-125.26 69-143.977"
                fill="none"
                stroke="#0472e1"
                stroke-width="2"
              />
              <g fill="#0472e1">
                <circle cy="994.605" r="6" />
                <circle cx="69" cy="970.403" r="6" />
                <circle cx="138" cy="958.504" r="6" />
                <circle cx="207" cy="911.327" r="6" />
                <circle cx="276" cy="903.356" r="6" />
                <circle cx="345" cy="869.678" r="6" />
                <circle cx="414" cy="799.985" r="6" />
                <circle cx="483" cy="827.544" r="6" />
                <circle cx="552" cy="756.228" r="6" />
                <circle cx="621" cy="716.87" r="6" />
                <circle cx="690" cy="661.519" r="6" />
                <circle cx="759" cy="718.362" r="6" />
                <circle cx="828" cy="776.575" r="6" />
                <circle cx="897" cy="623.868" r="6" />
                <circle cx="966" cy="602.651" r="6" />
                <circle cx="1035" cy="665.208" r="6" />
                <circle cx="1104" cy="524.887" r="6" />
                <circle cx="1173" cy="645.842" r="6" />
                <circle cx="1242" cy="402.837" r="6" />
                <circle cx="1311" cy="368.482" r="6" />
                <circle cx="1380" cy="426.987" r="6" />
                <circle cx="1449" cy="487.529" r="6" />
                <circle cx="1518" cy="542.831" r="6" />
                <circle cx="1587" cy="310.041" r="6" />
                <circle cx="1656" cy="335.814" r="6" />
                <circle cx="1725" cy="362.11" r="6" />
                <circle cx="1794" cy="319.351" r="6" />
                <circle cx="1863" cy="139.072" r="6" />
                <circle cx="1932" cy="223.166" r="6" />
                <circle cx="2001" cy="79.189" r="6" />
              </g>
            </svg>
          </div>
        </div>
      </Card>
      <Card depth="regular" padding="regular">
        <CardHeader title="Total New Billing"></CardHeader>
        <div className="flex items-center gap-3">
          <span className="s-h2">$1.83M</span>
          <span className="leading-4">Dec $152.7K</span>
        </div>
        <div className="h-64">
          <div className="w-full h-64">
            <svg
              className="w-full h-full"
              preserveAspectRatio="none"
              viewBox="0 0 2000 1000"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 994.605c8.97-3.147 51.06-19.509 69-24.202 17.94-4.693 51.06-4.219 69-11.899 17.94-7.68 51.06-40.008 69-47.177 17.94-7.17 51.06-2.556 69-7.97 17.94-5.415 51.06-20.24 69-33.679 17.94-13.438 51.06-64.216 69-69.693 17.94-5.478 51.06 33.247 69 27.559 17.94-5.689 51.06-56.929 69-71.316 17.94-14.388 51.06-27.046 69-39.358 17.94-12.313 51.06-55.545 69-55.351 17.94.194 51.06 41.885 69 56.843 17.94 14.957 51.06 70.497 69 58.213 17.94-12.284 51.06-130.097 69-152.707 17.94-22.61 51.06-26.591 69-21.217 17.94 5.374 51.06 72.666 69 62.557 17.94-10.11 51.06-137.804 69-140.321 17.94-2.518 51.06 136.821 69 120.955 17.94-15.867 51.06-206.949 69-243.005 17.94-36.057 51.06-37.494 69-34.355 17.94 3.14 51.06 43.029 69 58.505 17.94 15.476 51.06 45.482 69 60.542 17.94 15.06 51.06 78.375 69 55.302 17.94-23.074 51.06-205.877 69-232.79 17.94-26.912 51.06 19.004 69 25.773 17.94 6.769 51.06 28.437 69 26.296 17.94-2.14 51.06-13.764 69-42.759 17.94-28.995 51.06-167.775 69-180.28 17.94-12.503 51.06 91.88 69 84.095 17.94-7.784 60.03-125.26 69-143.977L2000 1000H0Z"
                fill="#0472e11a"
              />
              <path
                d="M0 994.605c8.97-3.147 51.06-19.509 69-24.202 17.94-4.693 51.06-4.219 69-11.899 17.94-7.68 51.06-40.008 69-47.177 17.94-7.17 51.06-2.556 69-7.97 17.94-5.415 51.06-20.24 69-33.679 17.94-13.438 51.06-64.216 69-69.693 17.94-5.478 51.06 33.247 69 27.559 17.94-5.689 51.06-56.929 69-71.316 17.94-14.388 51.06-27.046 69-39.358 17.94-12.313 51.06-55.545 69-55.351 17.94.194 51.06 41.885 69 56.843 17.94 14.957 51.06 70.497 69 58.213 17.94-12.284 51.06-130.097 69-152.707 17.94-22.61 51.06-26.591 69-21.217 17.94 5.374 51.06 72.666 69 62.557 17.94-10.11 51.06-137.804 69-140.321 17.94-2.518 51.06 136.821 69 120.955 17.94-15.867 51.06-206.949 69-243.005 17.94-36.057 51.06-37.494 69-34.355 17.94 3.14 51.06 43.029 69 58.505 17.94 15.476 51.06 45.482 69 60.542 17.94 15.06 51.06 78.375 69 55.302 17.94-23.074 51.06-205.877 69-232.79 17.94-26.912 51.06 19.004 69 25.773 17.94 6.769 51.06 28.437 69 26.296 17.94-2.14 51.06-13.764 69-42.759 17.94-28.995 51.06-167.775 69-180.28 17.94-12.503 51.06 91.88 69 84.095 17.94-7.784 60.03-125.26 69-143.977"
                fill="none"
                stroke="#0472e1"
                stroke-width="2"
              />
              <g fill="#0472e1">
                <circle cy="994.605" r="6" />
                <circle cx="69" cy="970.403" r="6" />
                <circle cx="138" cy="958.504" r="6" />
                <circle cx="207" cy="911.327" r="6" />
                <circle cx="276" cy="903.356" r="6" />
                <circle cx="345" cy="869.678" r="6" />
                <circle cx="414" cy="799.985" r="6" />
                <circle cx="483" cy="827.544" r="6" />
                <circle cx="552" cy="756.228" r="6" />
                <circle cx="621" cy="716.87" r="6" />
                <circle cx="690" cy="661.519" r="6" />
                <circle cx="759" cy="718.362" r="6" />
                <circle cx="828" cy="776.575" r="6" />
                <circle cx="897" cy="623.868" r="6" />
                <circle cx="966" cy="602.651" r="6" />
                <circle cx="1035" cy="665.208" r="6" />
                <circle cx="1104" cy="524.887" r="6" />
                <circle cx="1173" cy="645.842" r="6" />
                <circle cx="1242" cy="402.837" r="6" />
                <circle cx="1311" cy="368.482" r="6" />
                <circle cx="1380" cy="426.987" r="6" />
                <circle cx="1449" cy="487.529" r="6" />
                <circle cx="1518" cy="542.831" r="6" />
                <circle cx="1587" cy="310.041" r="6" />
                <circle cx="1656" cy="335.814" r="6" />
                <circle cx="1725" cy="362.11" r="6" />
                <circle cx="1794" cy="319.351" r="6" />
                <circle cx="1863" cy="139.072" r="6" />
                <circle cx="1932" cy="223.166" r="6" />
                <circle cx="2001" cy="79.189" r="6" />
              </g>
            </svg>
          </div>
        </div>
      </Card>
      <Card depth="regular" padding="regular">
        <CardHeader title="Total Payments"></CardHeader>
        <div className="flex items-center gap-3">
          <span className="s-h2">$16.75M</span>
          <span className="leading-4">Dec $1.3M</span>
        </div>
        <div className="h-64">
          <div className="w-full h-64">
            <svg
              className="w-full h-full"
              preserveAspectRatio="none"
              viewBox="0 0 2000 1000"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 994.605c8.97-3.147 51.06-19.509 69-24.202 17.94-4.693 51.06-4.219 69-11.899 17.94-7.68 51.06-40.008 69-47.177 17.94-7.17 51.06-2.556 69-7.97 17.94-5.415 51.06-20.24 69-33.679 17.94-13.438 51.06-64.216 69-69.693 17.94-5.478 51.06 33.247 69 27.559 17.94-5.689 51.06-56.929 69-71.316 17.94-14.388 51.06-27.046 69-39.358 17.94-12.313 51.06-55.545 69-55.351 17.94.194 51.06 41.885 69 56.843 17.94 14.957 51.06 70.497 69 58.213 17.94-12.284 51.06-130.097 69-152.707 17.94-22.61 51.06-26.591 69-21.217 17.94 5.374 51.06 72.666 69 62.557 17.94-10.11 51.06-137.804 69-140.321 17.94-2.518 51.06 136.821 69 120.955 17.94-15.867 51.06-206.949 69-243.005 17.94-36.057 51.06-37.494 69-34.355 17.94 3.14 51.06 43.029 69 58.505 17.94 15.476 51.06 45.482 69 60.542 17.94 15.06 51.06 78.375 69 55.302 17.94-23.074 51.06-205.877 69-232.79 17.94-26.912 51.06 19.004 69 25.773 17.94 6.769 51.06 28.437 69 26.296 17.94-2.14 51.06-13.764 69-42.759 17.94-28.995 51.06-167.775 69-180.28 17.94-12.503 51.06 91.88 69 84.095 17.94-7.784 60.03-125.26 69-143.977L2000 1000H0Z"
                fill="#0472e11a"
              />
              <path
                d="M0 994.605c8.97-3.147 51.06-19.509 69-24.202 17.94-4.693 51.06-4.219 69-11.899 17.94-7.68 51.06-40.008 69-47.177 17.94-7.17 51.06-2.556 69-7.97 17.94-5.415 51.06-20.24 69-33.679 17.94-13.438 51.06-64.216 69-69.693 17.94-5.478 51.06 33.247 69 27.559 17.94-5.689 51.06-56.929 69-71.316 17.94-14.388 51.06-27.046 69-39.358 17.94-12.313 51.06-55.545 69-55.351 17.94.194 51.06 41.885 69 56.843 17.94 14.957 51.06 70.497 69 58.213 17.94-12.284 51.06-130.097 69-152.707 17.94-22.61 51.06-26.591 69-21.217 17.94 5.374 51.06 72.666 69 62.557 17.94-10.11 51.06-137.804 69-140.321 17.94-2.518 51.06 136.821 69 120.955 17.94-15.867 51.06-206.949 69-243.005 17.94-36.057 51.06-37.494 69-34.355 17.94 3.14 51.06 43.029 69 58.505 17.94 15.476 51.06 45.482 69 60.542 17.94 15.06 51.06 78.375 69 55.302 17.94-23.074 51.06-205.877 69-232.79 17.94-26.912 51.06 19.004 69 25.773 17.94 6.769 51.06 28.437 69 26.296 17.94-2.14 51.06-13.764 69-42.759 17.94-28.995 51.06-167.775 69-180.28 17.94-12.503 51.06 91.88 69 84.095 17.94-7.784 60.03-125.26 69-143.977"
                fill="none"
                stroke="#0472e1"
                stroke-width="2"
              />
              <g fill="#0472e1">
                <circle cy="994.605" r="6" />
                <circle cx="69" cy="970.403" r="6" />
                <circle cx="138" cy="958.504" r="6" />
                <circle cx="207" cy="911.327" r="6" />
                <circle cx="276" cy="903.356" r="6" />
                <circle cx="345" cy="869.678" r="6" />
                <circle cx="414" cy="799.985" r="6" />
                <circle cx="483" cy="827.544" r="6" />
                <circle cx="552" cy="756.228" r="6" />
                <circle cx="621" cy="716.87" r="6" />
                <circle cx="690" cy="661.519" r="6" />
                <circle cx="759" cy="718.362" r="6" />
                <circle cx="828" cy="776.575" r="6" />
                <circle cx="897" cy="623.868" r="6" />
                <circle cx="966" cy="602.651" r="6" />
                <circle cx="1035" cy="665.208" r="6" />
                <circle cx="1104" cy="524.887" r="6" />
                <circle cx="1173" cy="645.842" r="6" />
                <circle cx="1242" cy="402.837" r="6" />
                <circle cx="1311" cy="368.482" r="6" />
                <circle cx="1380" cy="426.987" r="6" />
                <circle cx="1449" cy="487.529" r="6" />
                <circle cx="1518" cy="542.831" r="6" />
                <circle cx="1587" cy="310.041" r="6" />
                <circle cx="1656" cy="335.814" r="6" />
                <circle cx="1725" cy="362.11" r="6" />
                <circle cx="1794" cy="319.351" r="6" />
                <circle cx="1863" cy="139.072" r="6" />
                <circle cx="1932" cy="223.166" r="6" />
                <circle cx="2001" cy="79.189" r="6" />
              </g>
            </svg>
          </div>
        </div>
      </Card>
      <Card depth="regular" padding="regular">
        <CardHeader title="Total Refunds" />
        <div className="flex items-center gap-3">
          <span className="s-h2">$5.05K</span>
          <span className="leading-4">Dec $380</span>
        </div>
        <div className="h-64">
          <div className="w-full h-64">
            <svg
              className="w-full h-full"
              preserveAspectRatio="none"
              viewBox="0 0 2000 1000"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 994.605c8.97-3.147 51.06-19.509 69-24.202 17.94-4.693 51.06-4.219 69-11.899 17.94-7.68 51.06-40.008 69-47.177 17.94-7.17 51.06-2.556 69-7.97 17.94-5.415 51.06-20.24 69-33.679 17.94-13.438 51.06-64.216 69-69.693 17.94-5.478 51.06 33.247 69 27.559 17.94-5.689 51.06-56.929 69-71.316 17.94-14.388 51.06-27.046 69-39.358 17.94-12.313 51.06-55.545 69-55.351 17.94.194 51.06 41.885 69 56.843 17.94 14.957 51.06 70.497 69 58.213 17.94-12.284 51.06-130.097 69-152.707 17.94-22.61 51.06-26.591 69-21.217 17.94 5.374 51.06 72.666 69 62.557 17.94-10.11 51.06-137.804 69-140.321 17.94-2.518 51.06 136.821 69 120.955 17.94-15.867 51.06-206.949 69-243.005 17.94-36.057 51.06-37.494 69-34.355 17.94 3.14 51.06 43.029 69 58.505 17.94 15.476 51.06 45.482 69 60.542 17.94 15.06 51.06 78.375 69 55.302 17.94-23.074 51.06-205.877 69-232.79 17.94-26.912 51.06 19.004 69 25.773 17.94 6.769 51.06 28.437 69 26.296 17.94-2.14 51.06-13.764 69-42.759 17.94-28.995 51.06-167.775 69-180.28 17.94-12.503 51.06 91.88 69 84.095 17.94-7.784 60.03-125.26 69-143.977L2000 1000H0Z"
                fill="#0472e11a"
              />
              <path
                d="M0 994.605c8.97-3.147 51.06-19.509 69-24.202 17.94-4.693 51.06-4.219 69-11.899 17.94-7.68 51.06-40.008 69-47.177 17.94-7.17 51.06-2.556 69-7.97 17.94-5.415 51.06-20.24 69-33.679 17.94-13.438 51.06-64.216 69-69.693 17.94-5.478 51.06 33.247 69 27.559 17.94-5.689 51.06-56.929 69-71.316 17.94-14.388 51.06-27.046 69-39.358 17.94-12.313 51.06-55.545 69-55.351 17.94.194 51.06 41.885 69 56.843 17.94 14.957 51.06 70.497 69 58.213 17.94-12.284 51.06-130.097 69-152.707 17.94-22.61 51.06-26.591 69-21.217 17.94 5.374 51.06 72.666 69 62.557 17.94-10.11 51.06-137.804 69-140.321 17.94-2.518 51.06 136.821 69 120.955 17.94-15.867 51.06-206.949 69-243.005 17.94-36.057 51.06-37.494 69-34.355 17.94 3.14 51.06 43.029 69 58.505 17.94 15.476 51.06 45.482 69 60.542 17.94 15.06 51.06 78.375 69 55.302 17.94-23.074 51.06-205.877 69-232.79 17.94-26.912 51.06 19.004 69 25.773 17.94 6.769 51.06 28.437 69 26.296 17.94-2.14 51.06-13.764 69-42.759 17.94-28.995 51.06-167.775 69-180.28 17.94-12.503 51.06 91.88 69 84.095 17.94-7.784 60.03-125.26 69-143.977"
                fill="none"
                stroke="#0472e1"
                stroke-width="2"
              />
              <g fill="#0472e1">
                <circle cy="994.605" r="6" />
                <circle cx="69" cy="970.403" r="6" />
                <circle cx="138" cy="958.504" r="6" />
                <circle cx="207" cy="911.327" r="6" />
                <circle cx="276" cy="903.356" r="6" />
                <circle cx="345" cy="869.678" r="6" />
                <circle cx="414" cy="799.985" r="6" />
                <circle cx="483" cy="827.544" r="6" />
                <circle cx="552" cy="756.228" r="6" />
                <circle cx="621" cy="716.87" r="6" />
                <circle cx="690" cy="661.519" r="6" />
                <circle cx="759" cy="718.362" r="6" />
                <circle cx="828" cy="776.575" r="6" />
                <circle cx="897" cy="623.868" r="6" />
                <circle cx="966" cy="602.651" r="6" />
                <circle cx="1035" cy="665.208" r="6" />
                <circle cx="1104" cy="524.887" r="6" />
                <circle cx="1173" cy="645.842" r="6" />
                <circle cx="1242" cy="402.837" r="6" />
                <circle cx="1311" cy="368.482" r="6" />
                <circle cx="1380" cy="426.987" r="6" />
                <circle cx="1449" cy="487.529" r="6" />
                <circle cx="1518" cy="542.831" r="6" />
                <circle cx="1587" cy="310.041" r="6" />
                <circle cx="1656" cy="335.814" r="6" />
                <circle cx="1725" cy="362.11" r="6" />
                <circle cx="1794" cy="319.351" r="6" />
                <circle cx="1863" cy="139.072" r="6" />
                <circle cx="1932" cy="223.166" r="6" />
                <circle cx="2001" cy="79.189" r="6" />
              </g>
            </svg>
          </div>
        </div>
      </Card>
      {/* <Card depth="regular" padding="regular">
        <CardHeader title="Total Refunds"></CardHeader>
        <div className="flex items-center gap-3">
          <span className="s-h2">$156</span>
          <span className="leading-4">Dec $897</span>
        </div>
        <div className="w-full">
          <div className="flex items-end flex-grow w-full mt-8 space-x-2 sm:space-x-3">
            <div className="relative flex flex-col items-center flex-grow pb-5 group">
              <span className="absolute top-0 hidden -mt-6 text-xs font-semibold group-hover:block">
                $37,500
              </span>
              <div className="flex items-end w-full">
                <div className="relative flex justify-center flex-grow h-16 bg-[#fff0c6]"></div>
                <div className="relative flex justify-center flex-grow h-20 bg-[#ffdf88]"></div>
                <div className="relative flex justify-center flex-grow h-56 bg-[#FFC53F]"></div>
              </div>
              <span className="absolute bottom-0 text-xs font-semibold h-5">
                Jan
              </span>
            </div>
            <div className="relative flex flex-col items-center flex-grow pb-5 group">
              <span className="absolute top-0 hidden -mt-6 text-xs font-semibold group-hover:block">
                $45,000
              </span>
              <div className="flex items-end w-full">
                <div className="relative flex justify-center flex-grow h-20 bg-[#fae9cb]"></div>
                <div className="relative flex justify-center flex-grow h-32 bg-[#f5d192]"></div>
                <div className="relative flex justify-center flex-grow h-40 bg-[#EC972B]"></div>
              </div>
              <span className="absolute bottom-0 text-xs font-semibold h-5">
                Feb
              </span>
            </div>
            <div className="relative flex flex-col items-center flex-grow pb-5 group">
              <span className="absolute top-0 hidden -mt-6 text-xs font-semibold group-hover:block">
                $47,500
              </span>
              <div className="flex items-end w-full">
                <div className="relative flex justify-center flex-grow h-16 bg-[#fde8e3]"></div>
                <div className="relative flex justify-center flex-grow h-20 bg-[#fdd4cb]"></div>
                <div className="relative flex justify-center flex-grow h-48 bg-[#E85636]"></div>
              </div>
              <span className="absolute bottom-0 text-xs font-semibold h-5">
                Mar
              </span>
            </div>
            <div className="relative flex flex-col items-center flex-grow pb-5 group">
              <span className="absolute top-0 hidden -mt-6 text-xs font-semibold group-hover:block">
                $50,000
              </span>
              <div className="flex items-end w-full">
                <div className="relative flex justify-center flex-grow h-24 bg-[#f6ebfc]"></div>
                <div className="relative flex justify-center flex-grow h-16 bg-[#efdafa]"></div>
                <div className="relative flex justify-center flex-grow h-32 bg-[#B653E2]"></div>
              </div>
              <span className="absolute bottom-0 text-xs font-semibold h-5">
                Apr
              </span>
            </div>
            <div className="relative flex flex-col items-center flex-grow pb-5 group">
              <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
                $47,500
              </span>
              <div className="flex items-end w-full">
                <div className="relative flex justify-center flex-grow h-32 bg-[#d0f6fd]"></div>
                <div className="relative flex justify-center flex-grow h-16 bg-[#a7edfa]"></div>
                <div className="relative flex justify-center flex-grow h-20 bg-[#0AA4CD]"></div>
              </div>
              <span className="absolute bottom-0 text-xs font-semibold h-5">
                May
              </span>
            </div>
            <div className="relative flex flex-col items-center flex-grow pb-5 group">
              <span className="absolute top-0 hidden -mt-6 text-xs font-semibold group-hover:block">
                $55,000
              </span>
              <div className="flex items-end w-full">
                <div className="relative flex justify-center flex-grow h-12 bg-[#edf2d5]"></div>
                <div className="relative flex justify-center flex-grow h-24 bg-[#dae6b0]"></div>
                <div className="relative flex justify-center flex-grow h-32 bg-[#A4BF50]"></div>
              </div>
              <span className="absolute bottom-0 text-xs font-semibold h-5">
                Jun
              </span>
            </div>
          </div>
        </div>
      </Card> */}
    </div>
  );
};

export default StatGraph;
