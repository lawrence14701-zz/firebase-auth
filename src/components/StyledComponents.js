import styled from "styled-components";

const Block = styled.div`
  height: 38px;
  width: 391px;
  display: grid;
  grid-template-columns: 1fr 20px 1fr;
  grid-template-rows: 1fr;
  background-color: rgb(255, 255, 255);
`;

const Line = styled.div`
  margin: auto 20px;
  border: 1.5px solid rgb(150, 150, 150);
`;

const Text = styled.div`
  margin: auto 0;
  font-size: 22px;
  color: rgb(175, 175, 175);
`;

const Space = styled.div`
  margin-top: 4px;
  margin-bottom: 4px;
`;

export const Divider = () => (
  <Block>
    <Line />
    <Text>or</Text>
    <Line />
  </Block>
);

export const SpaceBetween = () => <Space />;
