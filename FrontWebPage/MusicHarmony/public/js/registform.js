
function registcheck(formEI)
{
	
	
	if (formEI.email.value.length == 0)
	{
		alert("Email Error");
		return false;
	}
	
	if(formEI.name.value.length == 0)
	{
		alert("Name Error");
		return false;
	}

	var pw = formEI.password.value
	var pwagain = formEI.passwordagain.value
	if( pw != pwagain)
	{
		alert("Password Error");
		return false;
	}
}

