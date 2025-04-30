# Signal Conditional Issue

We need to be careful when looking at the dependencies of a computed signal, especially if we have conditional logic.

- Angular will look only at the dependencies of the most recent calculated value for a derived signal. 

- That means the signal dependencies are dynamic and not fixed for the lifetime of the signal.

- **If a derived signal depends on a source signal, we need to make sure we call the source signal every time that the compute function gets called.**
