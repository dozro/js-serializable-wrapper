/**
 * A JSON-serializable extension of the native {@link Set}.
 *
 * Since JavaScript `Set` objects are not serialized by `JSON.stringify()`,
 * this class provides a custom {@link SerializableSet.toJSON | toJSON()}
 * implementation that converts the set into an array. Instances can be
 * reconstructed using {@link SerializableSet.fromJSON | fromJSON()}.
 *
 * @template ItemType Type of the values stored in the set.
 * @author Rye
 *
 * @example
 * const set = new SerializableSet([1, 2, 3]);
 *
 * const json = JSON.stringify(set);
 * // "[1,2,3]"
 *
 * const restored = SerializableSet.fromJSON(JSON.parse(json));
 */
export class SerializableSet<ItemType> extends Set<ItemType> {
  /**
   * Converts this set into a JSON-serializable array.
   *
   * Automatically used by `JSON.stringify()`.
   *
   * @returns An array containing all values in insertion order.
   */
  toJSON(): ItemType[] {
    return Array.from(this);
  }

  /**
   * Creates a new {@link SerializableSet} from serialized array data.
   *
   * @template T
   * @param data Array containing the set values.
   * @returns A new `SerializableSet` containing the provided values.
   */
  static fromJSON<T>(data: T[]): SerializableSet<T> {
    return new SerializableSet<T>(data);
  }

  /**
   * Creates a new set containing the results of applying a transformation
   * function to each value in this set.
   *
   * @template U
   * @param callbackfn Function invoked for each value in the set.
   * @returns A new `SerializableSet` containing the transformed values.
   */
  map<U>(
    callbackfn: (value: ItemType, index: number, array: ItemType[]) => U,
  ): SerializableSet<U> {
    const values = Array.from(this);
    return new SerializableSet<U>(values.map(callbackfn));
  }
}
