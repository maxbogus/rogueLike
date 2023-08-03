import React from 'react';

interface HelpProps {
    returnBack(): void;
}

export const Help = ({returnBack}: HelpProps) => <>
    <div onClick={returnBack}>Back</div>
    <div>Help</div>
</>;
