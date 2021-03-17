import React, { useEffect, useState } from 'react';
import { ButtonGroup, Button, Form } from 'react-bootstrap';
import * as moment from 'moment';

interface Props {
}

const Timer: React.FC<Props> = () => {
  const [duration, setDuration] = useState<string>('');
  const [started, setStarted] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRemaining(moment.duration(remaining).subtract(1, 'second').asMilliseconds());
    }, 1000);
    if(remaining === 0) {
      setStarted(false);
      clearTimeout(timer);
    }
    if(!started) {
      clearTimeout(timer);
    }
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  }, [started, remaining]);

  const onStart = () => {
    setRemaining(moment.duration(duration).asMilliseconds());
    setStarted(true);
  }

  const onStop = () => {
    setStarted(false);
  }

  const onReset = () => {
    setStarted(false);
    setRemaining(null);
    setDuration('');
  }

  const remainingTime = moment.duration(remaining);

  return (
    <Form>
      <Form.Group>
        <Form.Label htmlFor="timeInput">
          Time duration
        </Form.Label>
        <Form.Control
          className="mb-2 mr-sm-2"
          id="timeInput"
          placeholder="hh:mm:ss"
          type="text"
          value={duration}
          onChange={(event) => setDuration(event.target.value)}
          disabled={started}
        />
      </Form.Group>
      <ButtonGroup>
        <Button variant="primary" onClick={onStart} disabled={started}>Start</Button>
        <Button variant="danger" onClick={onStop} disabled={!started}>Stop</Button>
        <Button variant="secondary" onClick={onReset}>Reset</Button>
      </ButtonGroup>
      <Form.Group>
        <Form.Label>
          {started && remainingTime.asSeconds() > 0 && `${remainingTime.hours()} hours ${remainingTime.minutes()} minutes ${remainingTime.seconds()} seconds remaining`}
          {remainingTime.asSeconds() === 0 && "Time's up!" }
        </Form.Label>
      </Form.Group>
    </Form>
  );
}

export default Timer;
