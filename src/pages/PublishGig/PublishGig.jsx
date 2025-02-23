import { Stepper, Step, StepLabel, Typography } from "@mui/material";
import { useState } from "react";
import Overview from "../../components/Gigs/Overview";
import Pricing from "../../components/Gigs/Pricing";
import Description from "../../components/Gigs/Description";
import Gallery from "../../components/Gigs/Gallery";
import Publish from "../../components/Gigs/Publish";
import Requirement from "../../components/Gigs/Requirement";
import Advertisement from "../../components/Gigs/Advertisement";

const PublishGig = () => {
  const [activeStep, setActiveStep] = useState(0);
  const components = [
    { label: "Overview", element: <Overview setActiveStep={setActiveStep} /> },
    { label: "Pricing", element: <Pricing setActiveStep={setActiveStep} /> },
    {
      label: "Requirement",
      element: <Requirement setActiveStep={setActiveStep} />,
    },
    { label: "Gallery", element: <Gallery setActiveStep={setActiveStep} /> },
    { label: "Publish", element: <Publish setActiveStep={setActiveStep} /> },
    { label: "Advertisement", element: <Advertisement setActiveStep={setActiveStep} /> },
  ];
  const steps = ["Overview", "Pricing", "Description", "Gallery", "Publish"];

  const stepStyles = {
    "& .MuiStepIcon-root": {
      color: "gray",
    },
    "& .MuiStepConnector-line": {
      borderColor: "gray",
      borderWidth: "1px",
      borderRadius: "1px",
    },
    "& .Mui-active": {
      "&.MuiStepIcon-root": {
        color: "#DE0588",
        boxShadow: "0 0 0 2px #DE0588",
        borderRadius: "50%",
        padding: "2px",
      },
      "& .MuiStepConnector-line": {
        borderColor: "#DE0588",
        borderWidth: "1px",
        borderRadius: "1px",
      },
    },
    "& .Mui-completed": {
      "&.MuiStepIcon-root": {
        color: "#DE0588",
      },
      "& .MuiStepConnector-lineHorizontal": {
        borderColor: "#DE0588",
        borderWidth: "1px",
        borderRadius: "1px",
      },
    },
  };

  return (
    <div>
      <div className="pt-3 pb-5 px-24 text-white font-semibold text-4xl">
        Create New Gig
      </div>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={[stepStyles, { padding: 3, margin: 0 }]}
      >
        {components.map((comp, index) => (
          <Step key={index}>
            <StepLabel stepIcon>
              <Typography sx={{ color: "#fff" }}>{comp?.label}</Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep < components.length ? (
        components[activeStep].element
      ) : (
        <div className="text-4xl font-bold text-white text-center">
          All steps completed
        </div>
      )}
    </div>
  );
};

export default PublishGig;
