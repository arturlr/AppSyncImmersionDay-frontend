import { forwardRef } from 'react';
import { AppLayout, Box, Button, SpaceBetween } from '@cloudscape-design/components';
import { appLayoutAriaLabels } from './i18n-strings';
import { Navigation } from './navigation';

export const TableNoMatchState = props => (
    <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
        <SpaceBetween size="xxs">
            <div>
                <b>No matches</b>
                <Box variant="p" color="inherit">
                    We can't find a match.
                </Box>
            </div>
            <Button onClick={props.onClearFilter}>Clear filter</Button>
        </SpaceBetween>
    </Box>
);

export const TableEmptyState = ({ resourceName }) => (
    <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
        <SpaceBetween size="xxs">
            <div>
                <b>No results found</b>
                <Box variant="p" color="inherit">
                    No {resourceName.toLowerCase()} associated with this resource.
                </Box>
            </div>
        </SpaceBetween>
    </Box>
);

export const CustomAppLayout = forwardRef((props, ref) => {
    return (
        <AppLayout
            ref={ref}
            ariaLabels={appLayoutAriaLabels}
            toolsHide={true}
            navigation={<Navigation activeHref={props.activeHref} />}
            {...props}
        />
    );
});