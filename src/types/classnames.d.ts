declare module 'classnames' {
  export default function classNames(
    ...classObjectsOrString: (
      | Record<string, boolean | string | undefined>
      | string
      )[]
  ): string;
}
