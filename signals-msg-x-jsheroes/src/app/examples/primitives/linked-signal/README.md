# Linked Signal

Similar to a computed signal, but it allows us to write manually.


## Use Case 

- Data comes through reactively, but you still need to allow an overwrite by the user
- You feel tempted to use an effect to synchronize another signal because you can't use a computed signal.

## Notes

- Q: Why don't we use linked signals everywhere?
- R: Not everything should be writable (similar to access level modifier in that idea (not everything should be public))
