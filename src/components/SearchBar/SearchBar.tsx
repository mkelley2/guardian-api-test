import React, { FC } from "react";
import "./styles.scss";
import { Form, InputGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface SearchBarProps {
  value: string;
  onChange: (search: string) => void;
  submit: () => void;
  isLoading: boolean;
  error: string;
}

export const SearchBar: FC<SearchBarProps> = ({
  onChange,
  isLoading,
  value,
  submit,
  error,
}: SearchBarProps) => {
  return (
    <div className="SearchBarContainer">
      <Form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <InputGroup>
          <Form.Control
            placeholder={"Search"}
            value={value}
            isInvalid={!!error}
            onChange={(e) => {
              onChange(e.target.value);
            }}
          />
          <Button variant="success" type="submit" onClick={submit}>
            {isLoading ? (
              <FontAwesomeIcon size="lg" spin={true} icon="spinner" />
            ) : (
              "Search"
            )}
          </Button>
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </InputGroup>
      </Form>
    </div>
  );
};
