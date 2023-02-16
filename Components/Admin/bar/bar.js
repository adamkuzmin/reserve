const Bar = () => {
  const handleLogout = async () => {
    const response = await fetch("/api/login/logout");
    if (response.ok) {
      location.reload();
    } else {
      console.log("Logout failed");
    }
  };

  return (
    <>
      <div onClick={handleLogout}>Log out</div>
    </>
  );
};

export default Bar;
