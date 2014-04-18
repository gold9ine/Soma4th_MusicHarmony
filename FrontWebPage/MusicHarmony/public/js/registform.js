
function registcheck(formEI)
{
	if(formEI.password.value != formEI.comfirm-password.value);
	{
		alert("Password Error");
	}
	
	if (formEI.email.value == "")
	{
		alert("Email Error");
	}
	
	if(formEI.name.value == "")
	{
		alert("Name Error");
	}
}
