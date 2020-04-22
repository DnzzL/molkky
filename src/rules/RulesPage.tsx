import styled from '@emotion/styled';
import { Layout, Row } from 'antd';
import React from 'react';
import { AppFooter } from '../shared/AppFooter';
import Title from 'antd/lib/typography/Title';
const { Content } = Layout;

export const RulesPage = () => {
  return (
    <Layout className='layout'>
      <Content
        style={{
          overflow: 'auto',
        }}
      >
        <Title style={{ textAlign: 'center', margin: '16px' }}>Rules</Title>
        <Title level={3} style={{ textAlign: 'center' }}>
          Setup
        </Title>
        <Paragraph>
          The pins are initially placed in a tight group in an upright position
          3–4 meters away from the throwing line, with the pins organized as
          follows: 1st row, 1/2; 2nd row, 3/10/4; 3rd row, 5/11/12/6; 4th row,
          7/9/8.
        </Paragraph>

        <Title level={3} style={{ textAlign: 'center' }}>
          Scoring points
        </Title>
        <Paragraph>
          The players use a wooden pin to try to knock over wooden pins (also
          called "skittles") of almost similar dimensions with the throwing pin,
          which are marked with numbers from 1 to 12. Knocking over one pin
          scores the number of points marked on the pin. Knocking 2 or more pins
          scores the number of pins knocked over (e.g., knocking over 3 pins
          scores 3 points). A pin does not count if it is leaning on the
          throwing stick or one of the numbered pins (it must be parallel to the
          ground to count). After each throw, the pins are stood up again in the
          exact location where they landed.
        </Paragraph>

        <Title level={3} style={{ textAlign: 'center' }}>
          Goal
        </Title>
        <Paragraph>
          The first one to reach exactly 50 points wins the game. Scoring more
          than 50 will be penalised by setting the player's score back to 25
          points. A player will be eliminated from the game if they miss all of
          the target pins three times in a row.
        </Paragraph>

        <Title level={3} style={{ textAlign: 'center' }}>
          Fun fact
        </Title>
        <Paragraph>
          Due to the quirky nature of the starting arrangement, a song was
          produced to help young players in the UK remember the order. To the
          tune of 1-2-3-4-5. Once I caught a fish alive...
        </Paragraph>
      </Content>
      <AppFooter></AppFooter>
    </Layout>
  );
};

const Paragraph = styled.p`
  padding: 12px;
  text-align: justify;
`;
