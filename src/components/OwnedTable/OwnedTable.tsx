import { ownedSets } from "../../const/ownedSets.ts";

const sortedSets = [...ownedSets].sort((a, b) => b.year - a.year);

export const OwnedTable = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>Number</th>
          <th>Set name</th>
        </tr>
      </thead>
      <tbody>
        {sortedSets.map((set) => (
          <tr key={set.setNumber}>
            <td>{set.setNumber}</td>
            <td>{set.setName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
