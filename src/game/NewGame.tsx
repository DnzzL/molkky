import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Button, Form, Input, Slider, Typography, Layout } from 'antd';
import React, { CSSProperties } from 'react';

const { Title } = Typography;

type Props = {
  onGamePointsChangeHandle: Function;
  onFinishHandle: Function;
};

export const NewGame = ({
  onGamePointsChangeHandle,
  onFinishHandle,
}: Props) => {
  return (
    <Layout className='layout' style={{ width: '100%' }}>
      <TitleWrapper>
        <Title>New Game</Title>
      </TitleWrapper>
      <FormWrapper>
        <Form
          style={FormStyle}
          name='dynamic_form_item'
          initialValues={{ remember: true }}
          onFinish={(values) => onFinishHandle(values)}
        >
          <Form.List name='players'>
            {(fields, { add, remove }) => {
              return (
                <div>
                  <PointsWrapper>
                    <Title level={4}>Game Points</Title>
                    <Form.Item
                      required={false}
                      key='points'
                      style={{ width: '100%' }}
                    >
                      <Slider
                        min={1}
                        max={100}
                        defaultValue={50}
                        onChange={(value) => onGamePointsChangeHandle(value)}
                      />
                    </Form.Item>
                  </PointsWrapper>
                  <PlayersWrapper>
                    <Title level={4}>Players</Title>
                    {fields.map((field, index) => (
                      <Form.Item
                        required={false}
                        key={field.key}
                        style={{ display: 'flex' }}
                      >
                        <Form.Item
                          {...field}
                          validateTrigger={['onChange', 'onBlur']}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message:
                                "Please input player's name or delete this field.",
                            },
                          ]}
                          noStyle
                        >
                          <Input placeholder='name' style={{ width: '80%' }} />
                        </Form.Item>
                        {fields.length > 1 ? (
                          <MinusCircleOutlined
                            className='dynamic-delete-button'
                            style={{ margin: '0 8px' }}
                            onClick={() => {
                              remove(field.name);
                            }}
                          />
                        ) : null}
                      </Form.Item>
                    ))}
                    <Form.Item>
                      <Button
                        type='dashed'
                        onClick={() => {
                          add();
                        }}
                      >
                        <PlusOutlined /> Add player
                      </Button>
                    </Form.Item>
                  </PlayersWrapper>
                </div>
              );
            }}
          </Form.List>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Play
            </Button>
          </Form.Item>
        </Form>
      </FormWrapper>
    </Layout>
  );
};

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px 24px;
  height: 100%;
  align-items: center;
`;

const PlayersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px 24px;
  align-items: center;
`;

const PointsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px 24px;
  align-items: center;
`;

const FormStyle = {
  width: '80%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
} as CSSProperties;

const FormItemStyle = {
  width: '',
};
