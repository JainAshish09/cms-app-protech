import React from "react";
import Card from "./Card";

const CardsSection: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
                image="/images/demo.jpg"
                title="See PRO-TECH in action"
                description="Learn how PRO-TECH can accelerate productivity and streamline your workflow."
                buttonText="Request a demo"
            />
            <Card
                image="/images/training.jpg"
                title="Need help utilizing PRO-TECH?"
                description="Training sessions are available to help your team get the most out of PRO-TECH."
                buttonText="Further information on training"
            />
        </div>
    );
};

export default CardsSection;
