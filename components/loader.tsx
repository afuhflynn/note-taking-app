import { Loader2 } from "lucide-react"; // Importing an icon component from Lucide for a loading indicator

/* 
  This file contains custom-made loading indicators to be used throughout the application. 
  These indicators provide visual feedback to users when a process is in progress.
*/

/**
 * CustomLoader1: A simple circular loading spinner.
 *
 * - Uses the `Loader2` icon from Lucide React.
 * - Animates with a spinning effect.
 * - Styled with the class `text-text-primary-dark` to inherit the predefined dark text color.
 */
const CustomLoader1 = () => {
  return <Loader2 className="text-text-primary-dark animate-spin" />;
};

/**
 * CustomLoader2: A semi-oval loading spinner.
 *
 * - A div styled to look like a loading ring.
 * - Uses a spinning animation with `animate-spin`.
 * - `size-[2.8rem]`: Defines the overall size of the loader.
 * - `rounded-full`: Ensures a circular shape.
 * - `border-solid border-t-[3px] border-primary-accent-blue-light`:
 *   - Creates a visible top border.
 *   - Uses the primary blue accent color.
 *   - The rest of the border is invisible to create a loading effect.
 */
const CustomLoader2 = () => {
  return (
    <div className="animate-spin size-[2.8rem] rounded-full border-solid border-t-[3px] border-primary" />
  );
};

// Export both loaders for use in other parts of the application
export { CustomLoader1, CustomLoader2 };
