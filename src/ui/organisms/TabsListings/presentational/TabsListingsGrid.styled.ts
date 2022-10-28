import styled from 'styled-components';

export const TabsListingsGrid = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: repeat(auto-fill, 40px);
    justify-content: center;
    gap: 9px;
    padding: 10px 1px;
    overflow: auto;
`;
