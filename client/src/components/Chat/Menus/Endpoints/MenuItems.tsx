import type { FC } from 'react';
import { Close } from '@radix-ui/react-popover';
import { EModelEndpoint, alternateName } from 'librechat-data-provider';
import { useGetEndpointsQuery } from 'librechat-data-provider/react-query';
import MenuSeparator from '../UI/MenuSeparator';
import { getEndpointField } from '~/utils';
import MenuItem from './MenuItem';

const EndpointItems: FC<{
  endpoints: EModelEndpoint[];
  selected: EModelEndpoint | '';
}> = ({ endpoints, selected }) => {
  const { data: endpointsConfig } = useGetEndpointsQuery();
  console.log('endpointsConfig', endpoints);
  return (
    <>
    
            <Close asChild key={`endpoint-${endpoints[1]}`}>
              <div key={`endpoint-${endpoints[1]}`}>
                <MenuItem
                  key={`endpoint-item-${endpoints[1]}`}
                  title={endpoints[1]}
                  value={endpoints[1]}
                  selected={selected === endpoints[1]}
                  data-testid={`endpoint-item-${endpoints[1]}`}
                  // userProvidesKey={!!userProvidesKey}
                  // description="With DALL·E, browsing and analysis"
                />
                {/* {i !== endpoints.length - 1 && <MenuSeparator />} */}
              </div>
            </Close>
         
    </>
  );
};

export default EndpointItems;
