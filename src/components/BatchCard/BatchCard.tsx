import React, { useState } from 'react';
import "../../scss/batch-card.scss";
import { Redirect } from 'react-router-dom';
import { BasicBatchData, batchSkillToImage } from '../../types';

/**
 * This is a "card" which represents one of the different batches that
 * are mapped to a specific client. The button on this card should send the
 * user to a page displaying much more detailed information about this specific
 * batch.
 */
export const BatchCard: React.FC<BasicBatchData> = ({ batchId, name, skill }) => {
    const [image] = useState<string>(batchSkillToImage[skill]);

    return (
        <div id="batchcardcomp" className="batchcardcomp rev-card justify-content-center text-center">

            {/* Specialization image */}
            <div className="row justify-content-center">
                <img src={image} alt={skill + " thumbnail"} className="pic" id="img-test"/>
            </div>

            <br />
            <p id="test-spec" className="spec-text">{skill}</p>
            <p id="test-name">{name}</p>
            
            {/* View button */}
            <div className="row justify-content-center">
                <button onClick={() => <Redirect to={`/batch/${batchId}`} />} id="test-btn" className="view-btn">View</button>
            </div>
        </div>
    )
}