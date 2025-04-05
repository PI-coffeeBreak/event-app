export default function ComponentRenderer({ components }) {
    return (
        <div className="flex flex-col gap-4">
            {components.map((component, index) => {
                const { type: Component, props } = component;
                return <Component key={index} {...props} />;
            })}
        </div>
    );
}