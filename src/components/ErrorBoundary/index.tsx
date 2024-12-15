import { Component } from 'react';

function deepstringify(obj: any) {
  const seen: Record<any, any> = {}; // keep track of already processed objects

  const recurse = (value: any): any => {
    let result;

    // eslint-disable-next-line default-case
    switch (typeof value) {
      case 'object':
        if (Array.isArray(value)) {
          result = `[${value.map(recurse).join(', ')}]`;
        } else if (value instanceof Map || value instanceof Set) {
          const keys = [...value.keys()];
          const values = [...value.values()];
          result = `{ ${keys.map((k, i) => `${recurse(k)}: ${recurse(values[i])}`).join(', ')} }`;
        } else if (value instanceof Date) {
          result = `"${value.toISOString()}"`;
        } else if (value instanceof RegExp) {
          result = `/${value.source}/g`;
        } else if (value instanceof Error) {
          result = `error: "${value.message}"\nstack trace:\n${value.stack}`;
        } else if (value in seen) {
          result = `circular reference to ${seen[value]}`;
        } else {
          result = JSON.stringify(value);
        }

        seen[value] = true;

        return result;
    }

    return `${value}`;
  };

  return recurse(obj);
}

export class ErrorBoundary extends Component<any, { error: any }> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
    };
  }

  static getDerivedStateFromError(err: any) {
    // Update state so the next render will show the error.
    return { error: err };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="container">
          <style>
            {`
              html,body { padding: 0; margin: 0; }
              h1 { margin: 0; margin-bottom: 16px; }
              .container { max-width: 1200px; margin: 0 auto; text-align: center; margin-top: 64px; }
              pre { text-align: left; }
            `}
          </style>
          <h1>Что-то сломалось:</h1>
          <pre>{deepstringify(this.state.error)}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}
