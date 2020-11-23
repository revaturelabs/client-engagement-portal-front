import React from "react";
import { Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import { isPropertySignature } from "typescript";

interface IProps{
    name: string,
    avgScore: number
}

export const BatchAssInfoCard: React.FC<IProps> = (props:IProps) => {
    
    const infoModal = () => {

    }
    
    return(
        <Card>
            <CardHeader>
                {props.name}
            </CardHeader>
            <CardBody>
                {props.avgScore}
            </CardBody>
            <CardFooter>
                <button onClick={infoModal}>View</button>
            </CardFooter>
        </Card>
    )
}