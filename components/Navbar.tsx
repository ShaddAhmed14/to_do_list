export const Navbar = () => {
  return (
    <div className="flex flex-wrap py-3 justify-around">
        <h1 className="text-lg font-semibold">Todo App</h1>
        <ul className="flex gap-[40px] text-m">
            <li>Home</li>
            <li>Product</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
    </div>
  )
}
