import { parseAsString, SingleParserBuilder, Values } from "nuqs";

export const searchParamsSchema = {
  tag: parseAsString,
  id: parseAsString,
  filter: parseAsString,
  query: parseAsString.withDefault(null),
};

type ParamsTypes = Values<{
  tag: SingleParserBuilder<string>;
  id: SingleParserBuilder<string>;
  filter: SingleParserBuilder<string>;
  query: SingleParserBuilder<string>;
}>;

// Helper function to build URLs with current params
export const buildUrl = (
  href: string,
  overrides: Partial<typeof searchParamsSchema> = {},
  params: ParamsTypes,
) => {
  const newParams = new URLSearchParams();
  const merged = { ...params, ...overrides };

  Object.entries(merged).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      newParams.set(key, value as string);
    }
  });

  return `${href}?${newParams.toString()}`;
};
