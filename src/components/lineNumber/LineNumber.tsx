import styles from './LineNumber.module.css';

interface QuantityLine {
  quantityLine: number;
}

const LineNumber = (props: QuantityLine) => {
  const showNumbers = () => {
    const line = [];

    for (let i = 1; i <= props.quantityLine; i++) {
      line.push(<span key={i}>{i}</span>);
    }

    return line;
  };
  return <div className={styles.lineNumber}>{showNumbers()}</div>;
};

export default LineNumber;
