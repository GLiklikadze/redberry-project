import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap size rounded-[5px] text-base font-normal transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        header:
          "bg-violet-custom shadow w-[268px] hover:bg-violet-custom/90 text-white",
        "header-outline":
          "border-violet-custom w-[225px] border-[1px] hover:bg-[#e7dbf5] text-[#212529] bg-white",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        comment:
          "bg-violet-custom hover:bg-violet-custom/90 absolute right-5 bottom-4 flex h-[35px] w-[155px] items-center justify-center rounded-[20px] px-5 py-2 text-white",
        cancel:
          "text-sm absolute rounded-full p-0 right-4 top-2 text-gray-custom hover:bg-gray-300 w-0.5",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-[40px] px-5 py-2.5",
      },
    },
    defaultVariants: {
      variant: "header",
      size: "default",
    },
  },
);
